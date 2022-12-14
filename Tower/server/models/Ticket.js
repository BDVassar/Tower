import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const ticketSchema = new Schema({
  eventId: { type: ObjectId, required: true },
  accountId: { type: ObjectId, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

ticketSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id'
}),

  ticketSchema.virtual('towerEvent', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id'
  })