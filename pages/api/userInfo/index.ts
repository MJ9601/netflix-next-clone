import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "next-auth/jwt";
import {
  createNewUserInfo,
  getUserInfos,
  updateUserPlanInfo,
  updateUserWishlist,
} from "../../../backend/services/userInfo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, cookies } = req;

  const decoded = await decode({
    token: cookies["next-auth.session-token"],
    secret: String(process.env.NEXTAUTH_SECRET),
  });

  if (method == "POST") {
    const { newUserInfo, error } = await createNewUserInfo({
      body,
      userEmail: String(decoded?.email),
    });
    !error ? res.status(400).send(error) : res.status(201).send(newUserInfo);
  } else if (method == "GET") {
    const { error, userInfos } = await getUserInfos({
      userEmail: String(decoded?.email),
    });

    !error ? res.status(400).send(error) : res.status(201).send(userInfos);
  } else if (method == "PUT") {
    const { error, updatedWishlist } = await updateUserWishlist({
      body,
      userEmail: String(decoded?.email),
    });
    !error
      ? res.status(400).send(error)
      : res.status(201).send(updatedWishlist);
  } else if (method == "PATCH") {
    const { error, updatedPlan } = await updateUserPlanInfo({
      body,
      userEmail: String(decoded?.email),
    });
    !error ? res.status(400).send(error) : res.status(201).send(updatedPlan);
  }
}
