<template>
  <section class="row text-light justify-content-center">
    <div class="col-8 mb-5">
      <section class="row">
        <div class="col-4 p-0 ">
          <img class="img-fluid" :src="ticket.event.coverImg" alt="">
        </div>
        <div class="col-8 bg-btnnav">
          <section class="row fw-bold mb-1">
            {{ ticket.event.name }}
          </section>
          <section class=" row mb-0">
            {{ ticket.event.location }}
          </section>
          <section class="row">
            {{ new Date(ticket.event.startDate).toLocaleDateString() }}
          </section>
          <section class="row justify-content-end">
            <div class="col-3">
              <button @click="removeTicket(ticket.id)" class="btn btn-danger" title="UnAttend"> UnAttend</button>
            </div>
          </section>
        </div>
      </section>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { ticketsService } from "../services/TicketsService.js";
export default {
  props: {
    ticket: { type: Object, required: true }
  },
  setup() {
    return {

      async removeTicket(ticketId) {
        try {
          await ticketsService.removeTicket(ticketId)
        } catch (error) {
          Pop.error(error)
          logger.log(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.bg-btnnav {
  background-color: #474C61;
}
</style>