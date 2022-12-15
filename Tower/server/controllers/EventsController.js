import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventByEventId)
      .get('/:id/tickets', this.getTicketsByEventId)
      .get('/:id/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
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
  async getEventByEventId(req, res, next) {
    try {
      const event = await eventsService.getEventByEventId(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {

      const comments = await commentsService.getCommentsByEventId(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEventId(req.params.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      // req.body.userId = req.userInfo.id
      const event = await eventsService.editEvent(req.body, req.params.id, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const event = await eventsService.cancelEvent(req.userInfo.id, req.params.id)
      return res.send(event + 'was archived')
    } catch (error) {
      next(error)
    }
  }
}