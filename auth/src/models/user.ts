import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are requried to create a new User
import { UserAttrs, UserInfo, OthersDetails } from "../common/Interfaces";

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  n_id: string;
  phone_number: string;
  email: string;
  password: string;
  user_info?: UserInfo;
  details?: Array<OthersDetails>;
  roles_to_users?: Array<{
    system_user_access_id: string;
    status: number;
    access: boolean;
  }>;
}

const userSchema = new mongoose.Schema(
  {
    n_id: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      requireed: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_info: {
      type: Object,
      requires: false,
    },
    details: {
      type: Object,
      require: false,
    },
    roles_to_users: {
      type: Object,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("Users", userSchema);

export { User };
