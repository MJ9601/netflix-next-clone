import { Ref, getModelForClass, prop, pre } from "@typegoose/typegoose";
import { Account } from "./account.model";
import { Session, SessionModel } from "./session.model";
import { createRandomId } from "./wishlist.model";

export class User {
  @prop({ unique: true, default: () => createRandomId() })
  public id: string;

  @prop({ unique: true })
  public email: string;

  @prop()
  public name: string;

  @prop()
  public emailVerified: string;

  @prop()
  public image: string;

  @prop({ ref: () => Account, type: () => [Account] })
  public accounts: Ref<Account>[];

  @prop({ ref: () => Session, type: () => [Session] })
  public sessions: Ref<Session>[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
