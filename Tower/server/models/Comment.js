import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const commentSchema = new Schema({
  creatorId: { type: ObjectId, required: true },
  eventId: { type: ObjectId, required: true },
  body: { type: String, required: true },
  isAttending: { type: Boolean }
}, { timestamps: true, toJSON: { virtuals: true } })

commentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id'
})