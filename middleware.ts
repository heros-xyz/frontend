import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const path = req.nextUrl.pathname;

      const isDashboard =
        path.startsWith("/fan") || path.startsWith("/athlete");
      const isSignUp = path.includes("/sign-up");

      if (isDashboard && !isSignUp) {
        return !!token;
      }

      return true;
    },
  },
});
