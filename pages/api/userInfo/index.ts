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
    // creating userinfos

    const { newUserInfo, error } = await createNewUserInfo({
      body,
      ownerId: String(decoded?.sub),
    });
    error ? res.status(400).send(error) : res.status(201).send(newUserInfo);
  } else if (method == "GET") {
    // getting userinfos

    const { error, userInfos } = await getUserInfos({
      ownerId: String(decoded?.sub),
    });

    error ? res.status(400).send(error) : res.status(201).send(userInfos);
  } else if (method == "PUT") {
    //updating wishlist

    const { error, updatedWishlist } = await updateUserWishlist({
      body,
      ownerId: String(decoded?.sub),
    });
    error ? res.status(400).send(error) : res.status(201).send(updatedWishlist);
  } else if (method == "PATCH") {
    // updating userPlan
    console.log(body);
    const { error, updatedPlan } = await updateUserPlanInfo({
      body,
      ownerId: String(decoded?.sub),
    });
    error ? res.status(400).send(error) : res.status(201).send(updatedPlan);
  }
}
