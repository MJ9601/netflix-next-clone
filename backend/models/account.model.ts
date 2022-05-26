import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";
import { createRandomId } from "./wishlist.model";

export class Account {
  @prop({ default: () => createRandomId() })
  public id: string;

  @prop({ ref: () => User })
  public userId: Ref<User>;

  @prop()
  public type: string;

  @prop({ unique: true })
  public provider: string;

  @prop({ unique: true })
  public providerAccountId: string;

  @prop()
  public refresh_token: string;

  @prop()
  public access_token: string;

  @prop()
  public expires_at: string;

  @prop()
  public scope: string;

  @prop()
  public id_token: string;

  @prop()
  public session_state: string;
}

export const AccountModel = getModelForClass(Account, {
  schemaOptions: {
    timestamps: true,
  },
});
