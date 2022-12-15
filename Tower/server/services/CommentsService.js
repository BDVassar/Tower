import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
  async removeComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment.creatorId != userId) throw new Forbidden('You do not have permission to delete this comment.')
    if (!comment) throw new BadRequest('This is not the comment you are looking for.(The comment does not exist)')
    await comment.remove()
    return comment


  }
  async getCommentsByEventId(eventId) {
    const eventComments = await dbContext.Comments.find({ eventId }).populate('creator')
    return eventComments
  }
  async createComment(body) {
    const event = await eventsService.getEventByEventId(body.eventId)
    if (event.isCanceled) throw new BadRequest('This event has been canceled')
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }

}

export const commentsService = new CommentsService()