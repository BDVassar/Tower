<template>
  <div class="col-12">
    <!-- SECTION events Details -->
    <section v-if="currentEvent" class="row coverPhoto p-0 rounded justify-content-evenly align-items-center">
      <div v-if="currentEvent.isCanceled" class="col-12">
        <p class="fw-bold text-light bg-cancel text-center"> The Event Has Been Canceled.</p>
      </div>
      <div v-else-if="currentEvent.capacity == 0" class="col-12">
        <p class="fw-bold text-light bg-cancel text-center"> The Event Is Sold Out.</p>
      </div>
      <div class="  col-5  rounded">
        <img class="img-fluid eventImg rounded" :src="currentEvent.coverImg" alt="">
      </div>
      <div class="col-7 text-light">
        <section class="row justify-content-end">
          <div class="col-1 mdi mdi-dots-horizontal fs-5 selectable"></div>
        </section>
        <section class="row justify-content-between">
          <div class="col-5">
            <h5>{{ currentEvent.name }}</h5>
            <p>{{ currentEvent.location }}</p>
          </div>
          <div class="col-4">
            <h5>{{ new Date(currentEvent.startDate).toLocaleDateString() }}</h5>
            <p>Starting at {{ new Date(currentEvent.startDate).toLocaleTimeString() }}</p>
          </div>
        </section>
        <section class="row">
          <p>{{ currentEvent.description }}</p>
        </section>
        <section class="row justify-content-between">
          <div class="col-5">
            <p>{{ currentEvent.capacity }} spots left</p>
          </div>
          <div class="col-2">
            <button :class="`btn btn-${currentEvent.isCanceled || currentEvent.capacity == 0 ? 'danger' : 'warning'}`"
              :disabled="currentEvent.isCanceled || currentEvent.capacity == 0">Attend <span
                class="mdi mdi-human"></span></button>
          </div>
        </section>
      </div>
    </section>
    <!-- SECTION event attendees -->
    <section class="row">
      <div class="col-12 text-light">
        <p>See who is attending</p>
      </div>
      <div class="col-12">
        <section v-if="currentAudience" class="row cardbgcolor">
          <img v-for="p in currentAudience" class="rounded-circle profilePic" :src="p.profile.picture" alt=""
            :title="p.profile.name">
        </section>
      </div>
    </section>
    <!-- SECTION event comments -->
    <section class="row justify-content-center">
      <div class="col-10">
        <p class="text-light">What are people saying</p>
      </div>
      <div class="col-10 cardbgcolor">
        <!-- SECTION comment form -->
        <section class="row justify-content-end p-3">
          <form @submit="createComment()">
            <div class="text-end">
              <p class="text-primary">Jump In The Conversation</p>
            </div>
            <div class="form-floating mb-3">
              <textarea v-model="newComment.body" class="form-control" placeholder="Leave a comment here"
                id="floatingTextarea2" style="height: 100px"></textarea>
              <label for="floatingTextarea2">Tell the People...</label>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-outline-info">Post Comment</button>
            </div>
          </form>
        </section>
        <!-- SECTION comments component -->
        <section class="row">
          <div v-for="c in currentComments" class="col-12">
            <CommentCard :comment="c" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";
import { commentsService } from "../services/CommentsService.js";

export default {
  setup() {
    const newComment = ref({})
    const route = useRoute();

    async function getEventByEventId() {
      try {
        await eventsService.getEventByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }

    async function getTicketsByEventId() {
      try {
        await eventsService.getTicketsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }

    async function getCommentsByEventId() {
      try {
        await eventsService.getCommentsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }

    onMounted(() => {
      getEventByEventId()
      getTicketsByEventId()
      getCommentsByEventId()
    })
    return {
      newComment,
      currentEvent: computed(() => AppState.activeEvent),
      currentAudience: computed(() => AppState.activeProfiles),
      currentComments: computed(() => AppState.activeComments),
      account: computed(() => AppState.account),

      async createComment() {
        try {
          newComment.value.eventId = route.params.eventId
          await commentsService.createComment(newComment.value)
          newComment.value = {}
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
.coverPhoto {
  // background-image: url('https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  height: 50vh;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-color: #474C61;
}

.cardbgcolor {
  background-color: #474C61;
}

.profilePic {
  height: 5vh;
  width: 7vh;
}

.eventImg {
  height: 40vh;
}

.bg-cancel {
  background-color: rgba(255, 0, 0, 0.502);
  color: black;
}
</style>