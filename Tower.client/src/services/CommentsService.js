import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log(res.data)
    AppState.activeComments.push(res.data)
  }

}

export const commentsService = new CommentsService