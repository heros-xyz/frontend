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
import { ATHLETE_ROLE, FAN_ROLE } from "@/utils/constants";

export const fanAuthGuard = async (
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

  if (session.user.role === ATHLETE_ROLE) {
    return {
      redirect: {
        destination: RoutePath.HOME,
        permanent: false,
      },
    };
  }

  if (session.user.role === FAN_ROLE && !session.user.isActive) {
    return {
      redirect: {
        destination: RoutePath.FAN_ONBOARDING,
        permanent: false,
      },
    };
  }

  return callback({ session });
};
