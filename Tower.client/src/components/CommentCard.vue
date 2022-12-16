<template>
  <section class="row p-3 justify-content-between">
    <div class="col-2 p-2">
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
import { computed, reactive, onMounted } from 'vue';
export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup() {
    return {
    }
  }
};
</script>


<style lang="scss" scoped>

</style>