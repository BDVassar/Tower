import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    // logger.log(res.data)
    AppState.activeComments.push(res.data)
  }

  async removeComment(commentId) {
    const res = await api.delete('api/comments/' + commentId)
    // logger.log('Deleted Comment', res.data)
    const index = AppState.activeComments.findIndex(c => c.id == commentId)
    if (index >= 0) {
      AppState.activeComments.splice(index, 1)
    }
  }

}

export const commentsService = new CommentsService