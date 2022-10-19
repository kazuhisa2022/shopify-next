import LineProvider from "next-auth/providers/line";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    LineProvider({
      clientId: process.env.NEXT_PUBLIC_LINE_AUTHORIZATION_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_LINE_AUTHORIZATION_CLIENT_SECRET,
    }),
  ],
};
export default NextAuth(authOptions);
