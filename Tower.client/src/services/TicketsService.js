import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketsService {

  async createTicket(eventId) {
    const res = await api.post('api/tickets', eventId)
    // logger.log('[new ticket]', res.data)
    AppState.activeProfiles.push(res.data)
    AppState.myTickets.push(res.data)
    AppState.activeEvent.capacity--
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    // logger.log('[My Tickets]', res.data)
    AppState.myTickets = res.data
  }

  async removeTicket(ticketId) {
    const res = await api.delete('api/tickets/' + ticketId)
    // logger.log('[Removed Ticket]', res.data)
    const index = AppState.myTickets.findIndex(t => t.id == ticketId)
    AppState.myTickets.splice(index, 1)
  }
}

export const ticketsService = new TicketsService()