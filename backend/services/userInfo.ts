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

export const addToUserWishlist = async ({ body, userEmail }: { body: any , userEmail:string}) => {
  const {db} = await connectToDB();
  try {
    const updatedWishlist = await db.collection("userInfos").updateOne({owner: userEmail}, )
  } catch (error) {
    
  }
};

export const getUserInfos = async() => {}
export const updateUserPlanInfo = async ({ body }: { body: any }) => {};
