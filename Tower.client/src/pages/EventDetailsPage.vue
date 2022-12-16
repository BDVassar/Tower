<template>
  <div class="col-12">
    <!-- SECTION main cover photo -->
    <section v-if="currentEvent" class="row coverPhoto p-0 rounded justify-content-evenly align-items-center">
      <div class="  col-5  rounded">
        <img class="img-fluid eventImg rounded" :src="currentEvent.coverImg" alt="">
      </div>
      <div class="col-7">
        <section class="row justify-content-end">
          <div class="col-1 mdi mdi-dots-horizontal fs-5 fw-bold"></div>
        </section>
        <section class="row">
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
        <section class="row">
          <div class="col-5">
            <p>{{ currentEvent.capacity }} spots left</p>
          </div>
          <div class="col-2">
            <button class="btn">Attend <span class="mdi mdi-human"></span></button>
          </div>
        </section>

      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";

export default {
  setup() {
    const route = useRoute();

    async function getEventByEventId() {
      try {
        await eventsService.getEventByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }

    onMounted(() => {
      getEventByEventId()
    })
    return {
      currentEvent: computed(() => AppState.activeEvent)
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

.eventImg {
  height: 40vh;
}
</style>