import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async getEventByEventId(eventId) {
    const event = await dbContext.Events.findById(eventId)
    return event
  }
  async getAllEvents() {
    const events = await dbContext.Events.find().populate('creator')
    return events
  }
  async createEvent(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator')
    return event
  }
  async editEvent(body, eventId, userId) {
    const event = await this.getEventByEventId(eventId)
    if (!event) throw new BadRequest('No event found for this request')
    if (event.creatorId != userId) throw new Forbidden('You do not have permission to edit this event.')
    if (event.isCanceled == true) throw new BadRequest('This event has been canceled.')

    event.name = body.name ? body.name : event.name
    event.description = body.description ? body.description : event.description
    event.coverImg = body.coverImg ? body.coverImg : event.coverImg
    event.location = body.location ? body.location : event.location
    event.capacity = body.capacity !== undefined ? body.capacity : event.capacity
    event.startDate = body.startDate !== undefined ? body.startDate : event.startDate
    // event.isCanceled = body.isCanceled !== undefined ? body.isCanceled : event.isCanceled
    event.type = body.type !== undefined ? body.type : event.type
    await event.save()
    return event
  }
  async cancelEvent(userId, eventId) {
    const event = await this.getEventByEventId(eventId)
    if (event.creatorId != userId) throw new Forbidden('You do not have permission to edit this event.')
    if (!event) throw new BadRequest('No event found for this request')
    event.isCanceled = !event.isCanceled
    await event.save()
    return event
  }

}

export const eventsService = new EventsService()