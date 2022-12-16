<template>

  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <section class=" eventCard row rounded m-2 flex-column justify-content-end p-0 border border-info border-3"
      :style="{ backgroundImage: `url('${event.coverImg}')` }">
      <div class="coverText p-2 text-light col-12">
        <h5 class="m-0 fw-bold">{{ event.name }}</h5>
        <p class="m-0">{{ event.location }}</p>
        <p class="m-0">{{ new Date(event.startDate).toLocaleDateString() }}</p>
      </div>
      <div v-if="event.isCanceled" class="col-12 text-center  text-light fw-bold bg-cancel">
        <p>Canceled</p>
      </div>
      <div v-if="event.capacity == 0" class="col-12 text-center  text-light fw-bold bg-cancel">
        <p>Sold Out.</p>
      </div>
    </section>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: {
    event: { type: Object, required: true }
  },
  setup() {

    return {}
  }
};
</script>


<style lang="scss" scoped>
.eventCard {
  height: 30vh;
}

.coverText {
  background-color: rgba(1, 1, 1, 0.614);
  backdrop-filter: blur(5px);
}

.bg-cancel {
  background-color: rgba(255, 0, 0, 0.502);
  color: black;
}
</style>