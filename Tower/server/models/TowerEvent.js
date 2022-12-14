import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true },
  type: { type: String, default: 'concert', enum: ['concert', 'convention', 'sport', 'digital'] }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: "creatorId",
  ref: 'account',
  foreignField: '_id'
})