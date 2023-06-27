import mongoose, { Types } from 'mongoose';

enum EStatus {
  active = 'active',
  inactive = 'inactive',
}

enum EOperationType {
  addition = 'addition',
  subtraction = 'subtraction',
  multiplication = 'multiplication',
  division = 'division',
  squareRoot = 'square_root',
  randomString = 'random_string',
}

export type OperationsDocument = mongoose.Document & {
  // id: number,
  cost: number,
  type: EOperationType,
  status: EStatus,
};

export const operationsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: (): Types.ObjectId => new Types.ObjectId(),
  },
  cost: { type: Number, required: true },
  type: {
    type: String, required: true, unique: true, index: true,
  },
  status: { type: String, default: EStatus.active },
}, {
  toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
});

// eslint-disable-next-line func-names
operationsSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id;
});

export const operations = (mongoose.models.operations || mongoose.model<OperationsDocument>('operations', operationsSchema, 'operations'));
