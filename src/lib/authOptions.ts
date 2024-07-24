import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbRegister from "../app/api/auth/[...nextauth]/dbRegister";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await dbRegister(user);
      return true;
    },
  },
};
