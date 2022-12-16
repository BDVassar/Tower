import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {

  async getAll() {
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data
  }

  async getEventByEventId(eventId) {
    const res = await api.get('api/events/' + eventId)
    logger.log(res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    logger.log(res.data)
  }

}
export const eventsService = new EventsService()