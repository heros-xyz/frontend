import { ParsedUrlQuery } from "querystring";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  PreviewData,
} from "next";
import { unstable_getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { RoutePath } from "@/utils/route";

export const checkUserRoles = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  callback: Function
) => {
  const { req, res } = context;

  const session = await unstable_getServerSession(
    req,
    res,
    nextAuthOptions(req as NextApiRequest, res as NextApiResponse)
  );

  if (session && session.user?.role === "ATHLETE") {
    if (session.user.isActive) {
      if (session.user.isFinishOnboarding) {
        return {
          redirect: {
            destination: RoutePath.ATHLETE,
            permanent: false,
          },
        };
      }

      return {
        redirect: {
          destination: RoutePath.ATHLETE_CHECKLIST,
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: RoutePath.ATHLETE_SETUP_ACCOUNT,
        permanent: false,
      },
    };
  }

  if (session && session.user?.role === "FAN") {
    if (session.user.isActive) {
      return {
        redirect: {
          destination: RoutePath.FAN,
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: RoutePath.FAN_ONBOARDING,
        permanent: false,
      },
    };
  }

  return callback({ session });
};
