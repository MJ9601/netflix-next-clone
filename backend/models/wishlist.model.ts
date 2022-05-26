import { getModelForClass, prop, pre, Ref } from "@typegoose/typegoose";
import { MovieObjectOnPage, MovieRespObj } from "../../typing";
import { customAlphabet } from "nanoid";
import { User } from "./user.model";

export const createRandomId = customAlphabet(
  "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
);

export class Wishlist {
  @prop({ required: true, default: "wishlist" })
  public name: string;

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;

  @prop({ unique: true, default: () => createRandomId() })
  public videoId: string;

  @prop({ default: [], type: () => [Object] })
  public videos?: (MovieObjectOnPage | MovieRespObj)[];
}

export const WishlistModel = getModelForClass(Wishlist, {
  schemaOptions: {
    timestamps: true,
  },
});
