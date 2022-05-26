import { getModelForClass, prop, pre, Ref } from "@typegoose/typegoose";
import { User, UserModel } from "./user.model";
import { createRandomId } from "./wishlist.model";

export class Session {
  @prop({ unique: true, default: () => createRandomId() })
  public sessionId: string;

  @prop({ unique: true })
  public sessionToken: string;

  @prop({ ref: () => User })
  public userId: Ref<User>;

  @prop()
  public expires: Date;
}

export const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});
