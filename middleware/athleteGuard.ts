import { ParsedUrlQuery } from "querystring";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  PreviewData,
} from "next";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { RoutePath } from "@/utils/route";
import { FAN_ROLE } from "@/utils/constants";

export const athleteGuard = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  callback: Function
) => {
  const { req, res } = context;

  const session = await getServerSession(
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

  if (!session.user.isActive) {
    return {
      redirect: {
        destination: RoutePath.ATHLETE_SETUP_ACCOUNT,
        permanent: false,
      },
    };
  }

  if (session.user.role === FAN_ROLE) {
    return {
      redirect: {
        destination: RoutePath.HOME,
        permanent: false,
      },
    };
  }

  if (!session.user.isFinishOnboarding) {
    return {
      redirect: {
        destination: RoutePath.ATHLETE_CHECKLIST,
        permanent: false,
      },
    };
  }

  return callback({ session });
};
