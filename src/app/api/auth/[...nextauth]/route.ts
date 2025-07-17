import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { CookiesKeys } from "@/utils/enums/cookies.enum";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    secret: process.env.NEXTAUTH_SECRET!,
    events: {
      signOut: async () => {
        const cookieStore = await cookies();
        cookieStore.delete(CookiesKeys.AUTH);
      },
    },
    providers: [
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      jwt: async ({ token, user, account }) => {
        if (account?.provider === "google") {
          /* 
          const loginResponse = await LoginService().googleLogin(
            {
              token: account.id_token || "",
            },
            origin
          );

          if (loginResponse.error) {
            // TODO: logout the user and finish session
          }

          const accessToken = loginResponse.data?.token;

          cookieStore.set(CookiesKeys.AUTH, accessToken || "");

          token.user = loginResponse.data; */
          return token;
        }

        if (user) {
          token.user = user;
        }

        return token;
      },
      session: async ({ session, token }) => {
        const tokenUser = token.user as Session["user"];

        const cookieStore = await cookies();

        const JWT = cookieStore.get(CookiesKeys.AUTH)?.value ?? "";

        /*     if (tokenUser) {
          const res = await LoginService({ accessToken: JWT }).getUser({
            id: tokenUser.id,
          });

          if (res.error) {
            return session;
          }

          session.user = res.data;
        } */

        return session;
      },
    },
  });
};

export { handler as GET, handler as POST };
