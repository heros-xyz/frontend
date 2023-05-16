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

export const guestGuard = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  callback: Function
) => {
  const { req, res, query } = context;

  const session = await getServerSession(
    req,
    res,
    nextAuthOptions(req as NextApiRequest, res as NextApiResponse)
  );

  if (session && session.user.role === ATHLETE_ROLE && !session.user.isActive) {
    return {
      redirect: {
        destination: RoutePath.ATHLETE_SETUP_ACCOUNT,
        permanent: false,
      },
    };
  }

  if (session && session.user.role === ATHLETE_ROLE && !session.user.isFinishOnboarding) {
    return {
      redirect: {
        destination: RoutePath.ATHLETE_CHECKLIST,
        permanent: false,
      },
    };
  }

  if (session && session.user.role === ATHLETE_ROLE) {
    return {
      redirect: {
        destination: RoutePath.ATHLETE_PROFILE,
        permanent: false,
      },
    };
  }

  if (session && session.user.role === FAN_ROLE && !session.user.isActive) {
    return {
      redirect: {
        destination: RoutePath.FAN_ONBOARDING,
        permanent: false,
      },
    };
  }

  if (session && session.user.role === FAN_ROLE) {
    return {
      redirect: {
        destination: RoutePath.FAN_VIEW_ATHLETE_PROFILE(query.id as string),
        permanent: false,
      },
    };
  }

  return callback({ session: session ?? {} });
};
