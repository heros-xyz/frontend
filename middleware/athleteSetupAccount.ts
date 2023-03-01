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

export const athleteSetupAccountGuard = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  callback: Function
) => {
  const { req, res } = context;

  const session = await unstable_getServerSession(
    req,
    res,
    nextAuthOptions(req as NextApiRequest, res as NextApiResponse)
  );

  if (!session) {
    return {
      redirect: {
        destination: RoutePath.HOME,
        permanent: false,
      },
    };
  }

  if (session.user.role === "FAN") {
    return {
      redirect: {
        destination: RoutePath.HOME,
        permanent: false,
      },
    };
  }

  if (session.user.isActive) {
    return {
      redirect: {
        destination: RoutePath.ATHLETE_CHECKLIST,
        permanent: false,
      },
    };
  }

  return callback({ session });
};
