import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import clientPromise from "../../../backend/utils/mongodb";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/subscribe",
    newUser: "/account",
    verifyRequest:'/verifyRequest'
  },
  session: {
    strategy: "jwt",
  },
  secret: String(process.env.NEXTAUTH_SECRET),
  jwt: {
    maxAge: 60 * 60 * 24 * 10,
  },
  debug: true,
});
