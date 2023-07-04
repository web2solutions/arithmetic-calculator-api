/* eslint-disable camelcase */
import mongoose, { Types } from 'mongoose';

enum EStatus {
  active = 'active',
  inactive = 'inactive',
}

export type RecordsDocument = mongoose.Document & {
  // id: number,
  operation_id: string,
  user_id: string,
  amount: number,
  user_balance: number,
  operation_response: string,
  date: Date,
  status: EStatus,
};

const recordsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: (): Types.ObjectId => new Types.ObjectId(),
  },
  operation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'operations' }, // { type: mongoose.Schema.Types.ObjectId, ref: 'operations' }
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // // { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
  amount: { type: Number, required: true },
  user_input_numbers: { type: Array, required: true },
  operation_response: {
    type: String, required: true, index: true,
  },
  status: { type: String, default: EStatus.active },
  date: { type: Date, default: Date.now },
}, {
  toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
});

// eslint-disable-next-line func-names
recordsSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id;
});

export const records = (mongoose.models.records || mongoose.model<RecordsDocument>('records', recordsSchema, 'records'));
