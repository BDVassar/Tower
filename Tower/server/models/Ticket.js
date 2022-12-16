import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const TicketSchema = new Schema({
  eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
  accountId: { type: ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
}),

  TicketSchema.virtual('event', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
  })