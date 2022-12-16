<template>
  <section class="row p-3 justify-content-between">
    <div class="col-2 p-2">
      <section v-if="comment.creatorId == account.id" class="row">
        <div class="col-1">
          <p @click="removeComment(comment._id)" class="mdi mdi-delete text-danger selectable" title="Delete Comment">
          </p>
        </div>
      </section>
      <img class="rounded-circle" :src="comment.creator.picture" alt="">
    </div>
    <div class="col-10 bg-light rounded text-start p-2">
      <p class="mb-0 fw-bold">{{ comment.creator.name }} <span v-if="comment.isAttending == true"
          class="text-primary">Attending Event</span></p>
      <p class="">{{ comment.body }}</p>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { commentsService } from "../services/CommentsService.js";
export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),

      async removeComment(commentId) {
        try {
          await commentsService.removeComment(commentId)
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>