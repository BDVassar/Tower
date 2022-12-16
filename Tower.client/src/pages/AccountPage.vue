<template>
  <div class="col-12">
    <section class="row">
      <div class="col-12 text-success">
        <p>My Events</p>
      </div>
      <div v-for="t in tickets" class="col-6 col-md-3 text-light rounded mb-4">
        <EventCard :event="t.event" />
      </div>
    </section>
    <section class="row">
      <div class="col-12 text-success">
        <p>My Tickets</p>
      </div>
      <div v-for="t in tickets" class="col-12">
        <TicketCard :ticket="t" />
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from "../services/TicketsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }

    onMounted(() => {
      getMyTickets();
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
