import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { JWT } from "next-auth/jwt";
import { IUser } from "@/types/next-auth.d";
import {
  fetchUser,
  getAccessTokenFromCookie,
  getUserRoleFromCookie,
  setAccessTokenToCookie,
  signInSocial,
} from "@/utils/auth";
import { HttpErrorCode } from "@/utils/enums";
import { IHerosError } from "@/types/globals/types";

export const nextAuthOptions = (
  request: NextApiRequest,
  response: NextApiResponse
): NextAuthOptions => ({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        accessToken: { label: "accessToken", type: "accessToken" },
        refreshToken: { label: "refreshToken", type: "refreshToken" },
        refreshExpiresIn: {
          label: "refreshExpiresIn",
          type: "refreshExpiresIn",
        },
        expiresIn: { label: "expiresIn", type: "expiresIn" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.accessToken) {
            setAccessTokenToCookie(credentials, request, response);
            const user = await fetchUser(credentials.accessToken);
            return user;
          }
        } catch (error) {
          const errorFormat =
            (error as IHerosError)?.errors || "Invalid Credentials";
          throw new Error(errorFormat);
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "public_profile email",
        },
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in/error",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (
        user &&
        account &&
        (account.provider === "google" || account.provider === "facebook")
      ) {
        const role = getUserRoleFromCookie(request, response);
        try {
          await signInSocial(
            {
              token: account.access_token,
              role: role as "FAN" | "ATHLETE",
              provider: account.provider,
            },
            request,
            response
          );

          return true;
        } catch (error) {
          deleteCookie("role", { req: request, res: response, path: "/" });
          switch ((error as IHerosError).statusCode) {
            case HttpErrorCode.USER_NOT_REGISTERED:
              return `/not-registered?error=${JSON.stringify(error)}`;
            case HttpErrorCode.USER_ALREADY_REGISTERED:
              return `/registered-email?error=${JSON.stringify(error)}`;
            case HttpErrorCode.USER_ALREADY_REGISTERED_OTHER_ROLE:
              return `/registered-email?error=${JSON.stringify(error)}`;
            default:
              return `/sign-in?error=${JSON.stringify(error)}&default-case`;
          }
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      const accessToken = getAccessTokenFromCookie(request, response);
      deleteCookie("role", { req: request, res: response, path: "/" });
      if (request.url === "/api/auth/session?update") {
        const userData = await fetchUser(accessToken as string);
        token.user = userData;
      }

      if (user) {
        if (
          account &&
          (account.provider === "google" || account.provider === "facebook")
        ) {
          const userData = await fetchUser(accessToken as string);
          user = userData ?? account;
        }

        token.user = user;
      }

      return Promise.resolve(token);
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user as IUser;

      return Promise.resolve(session);
    },
  },
});

export default function Auth(req: NextApiRequest, res: NextApiResponse) {
  NextAuth(req, res, nextAuthOptions(req, res));
}
