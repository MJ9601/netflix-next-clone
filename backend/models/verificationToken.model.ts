import { getModelForClass, pre, prop } from "@typegoose/typegoose";

export class VerificationToken {
  @prop({ unique: true })
  public identifier: string;

  @prop({ unique: true })
  public token: string;

  @prop()
  public expires: Date;
}

export const VerificationTokenModel = getModelForClass(VerificationToken, {
  schemaOptions: {
    timestamps: true,
  },
});
