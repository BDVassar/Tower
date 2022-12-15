import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"


class TicketsService {

  async getTicketsByEventId(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return eventTickets
  }
  async getMyTickets(accountId) {
    const myTickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return myTickets
  }
  async createTicket(body) {
    const event = await dbContext.Events.findById(body.eventId)
    if (event.capacity == 0) throw new BadRequest('The event is at capacity.')
    if (event.isCanceled) throw new BadRequest('The event has been canceled')
    const ticket = await dbContext.Tickets.create(body)
    await ticket.populate('profile event')
    // @ts-ignore
    event.capacity--
    await event.save()
    return ticket
  }
  async removeTicket(ticketId, accountId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('event profile')
    if (ticket.accountId != accountId) throw new Forbidden('You do not have permission to delete this ticket')
    if (!ticket) throw new BadRequest('No ticket found')
    const event = await eventsService.getEventByEventId(ticket.eventId)
    if (event.isCanceled) throw new BadRequest('this event has been canceled')
    await ticket.remove()
    // @ts-ignore
    event.capacity += 1
    await event.save()
    return ticket
  }

}

export const ticketsService = new TicketsService()