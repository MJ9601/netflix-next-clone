import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, cookies } = req;

  const decoded = await decode({
    token: cookies["next-auth.session-token"],
    secret: String(process.env.NEXTAUTH_SECRET),
  });
}
