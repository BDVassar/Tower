import { dbContext } from "../db/DbContext.js"

class EventsService {
  async getAllEvents() {
    const events = await dbContext.Events.find().populate('creator')
    return events
  }
  async createEvent(body) {
    const event = await dbContext.Events.create(body)
    event.populate('creator')
    return event
  }

}

export const eventsService = new EventsService()