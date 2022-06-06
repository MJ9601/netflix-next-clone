import { MovieObjectOnPage, MovieRespObj } from "../../typing";
import { connectToDB } from "../utils/mongodbConn";

export const createNewUserInfo = async ({
  body,
  userEmail,
}: {
  body: any;
  userEmail: string;
}) => {
  const { db } = await connectToDB();

  const userInfos = { ...body, owner: userEmail };
  try {
    const newUserInfo = await db
      .collection("userInfos")
      .insertOne({ ...userInfos, createdAt: new Date() });

    return { newUserInfo };
  } catch (error) {
    return { error };
  }
};

export const updateUserWishlist = async ({
  body,
  userEmail,
}: {
  body: any;
  userEmail: string;
}) => {
  const { db } = await connectToDB();
  try {
    const userInfo = await db
      .collection("userInfos")
      .findOne({ owner: userEmail });
    const video = userInfo.wishlist.find(
      (videoInfo: MovieObjectOnPage | MovieRespObj) =>
        videoInfo?.id == body.video.id
    );
    if (!video) {
      const updatedWishlist = await db
        .collection("userInfos")
        .updateOne(
          { owner: userEmail },
          { $set: { wishlist: [...userInfo.wishlist, body.video] } },
          { new: true }
        );
      return { updatedWishlist };
    } else {
      const updatedWishlist = await db.collection("userInfos").updateOne(
        { owner: userEmail },
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

export const getUserInfos = async ({ userEmail }: { userEmail: string }) => {
  const { db } = await connectToDB();
  try {
    const userInfos = db.collection("userInfos").findOne({ owner: userEmail });
    return { userInfos };
  } catch (error) {
    return { error };
  }
};

export const updateUserPlanInfo = async ({
  body,
  userEmail,
}: {
  body: any;
  userEmail: string;
}) => {
  const { db } = await connectToDB();
  try {
    const updatedPlan = await db
      .collection("userInfos")
      .updateOne({ owner: userEmail }, { $set: { plan: body.plan } });
    return { updatedPlan };
  } catch (error) {
    return { error };
  }
};
