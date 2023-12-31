import mongoose, { Types } from 'mongoose';

enum EUserStatus {
  active = 'active',
  inactive = 'inactive',
}

export type UsersDocument = mongoose.Document & {
  // id: number,
  username: string,
  password: string,
  status: EUserStatus,
  token: string,
  balance: number;
  admin: boolean,
};

const usersSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: (): Types.ObjectId => new Types.ObjectId(),
  },
  username: {
    type: String, index: true, unique: true, required: true,
  },
  password: { type: String, required: true, select: false },
  salt: { type: String, required: true, select: false },
  status: { type: String, default: EUserStatus.inactive },
  token: { type: String, default: '' },
  balance: { type: Number, default: 0 },
  photo: { type: String, default: null },
  admin: { type: Boolean, default: false },
}, {
  toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
});

// eslint-disable-next-line func-names
usersSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id;
});

export const users = (mongoose.models.users || mongoose.model<UsersDocument>('users', usersSchema, 'users'));
