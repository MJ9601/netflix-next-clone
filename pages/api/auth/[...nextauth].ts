import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";
import clientPromise from "../../../backend/utils/mongodb";

export default NextAuth({
  providers: [],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/subscribe",
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
