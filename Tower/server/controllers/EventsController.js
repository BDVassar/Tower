import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
}