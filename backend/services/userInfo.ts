import { MovieObjectOnPage, MovieRespObj } from "../../typing";
import { connectToDB } from "../utils/mongodbConn";

export const createNewUserInfo = async ({
  body,
  ownerId,
}: {
  body: any;
  ownerId: string;
}) => {
  const { db } = await connectToDB();

  const userInfos = { ...body, owner: ownerId };
  try {
    const newUserInfo = await db
      .collection("user_infos")
      .insertOne({ ...userInfos, createdAt: new Date() });

    return { newUserInfo };
  } catch (error) {
    return { error };
  }
};

export const updateUserWishlist = async ({
  body,
  ownerId,
}: {
  body: any;
  ownerId: string;
}) => {
  const { db } = await connectToDB();
  try {
    const userInfo = await db
      .collection("user_infos")
      .findOne({ owner: ownerId });
    const video = userInfo.wishlist.find(
      (videoInfo: MovieObjectOnPage | MovieRespObj) =>
        videoInfo?.id == body.video.id
    );
    if (!video) {
      const updatedWishlist = await db
        .collection("user_infos")
        .updateOne(
          { owner: ownerId },
          { $set: { wishlist: [...userInfo.wishlist, body.video] } },
          { new: true }
        );
      return { updatedWishlist };
    } else {
      const updatedWishlist = await db.collection("user_infos").updateOne(
        { owner: ownerId },
        {
          $set: {
            wishlist: [
              ...userInfo.wishlist.filter(
                (videoInfo: MovieObjectOnPage | MovieRespObj) =>
                  videoInfo?.id != body.video.id
              ),
            ],
          },
        },
        { new: true }
      );
      return { updatedWishlist };
    }
  } catch (error) {
    return { error };
  }
};

export const getUserInfos = async ({ ownerId }: { ownerId: string }) => {
  const { db } = await connectToDB();
  try {
    const userInfos = await db
      .collection("user_infos")
      .findOne({ owner: ownerId });
    if (!userInfos)
      await db.collection("user_infos").insertOne({
        owner: ownerId,
        plan: "",
        wishlist: [],
      });
    return { userInfos };
  } catch (error) {
    return { error };
  }
};

export const updateUserPlanInfo = async ({
  body,
  ownerId,
}: {
  body: any;
  ownerId: string;
}) => {
  const { db } = await connectToDB();
  try {
    const updatedPlan = await db
      .collection("user_infos")
      .updateOne(
        { owner: ownerId },
        { $set: { plan: body.plan, updatedAt: new Date() } }
      );
    return { updatedPlan };
  } catch (error) {
    return { error };
  }
};
