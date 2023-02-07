<template>
  <header>
  </header>
  <main class="container-fluid m-0">
    <section class="row">
      <div class="col-12 col-md-11">
        <section class="row">
          <router-link class="d-flex" :to="{ name: 'Home' }">
            <div class="d-flex flex-column align-items-center pt-3">
              <img alt="logo" src="src/assets/img/Logo.png" height="45" />
            </div>
          </router-link>
        </section>
        <section class="row p-5">
          <router-view />
        </section>
      </div>
      <div class="col-12 col-md-1 bg-gradient">
        <Navbar />
      </div>
    </section>
  </main>
  <footer>
    <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="EventForm" aria-labelledby="EventLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title fw-bold" id="EventLabel">Create Your Event!</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <form @submit.prevent="createEvent()" class="d-flex flex-column">
          <div class="form-floating mb-3">
            <input v-model="newEvent.name" type="text" class="form-control bg-btnnav" id="name" placeholder="Name">
            <label for="name">Event Name</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="newEvent.description" type="text" class="form-control bg-btnnav" id="description"
              placeholder="Description">
            <label for="description">Description</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="newEvent.coverImg" type="Url" class="form-control bg-btnnav" id="coverImg"
              placeholder="Cover Image">
            <label for="coverImg">Cover Image</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="newEvent.location" type="text" class="form-control bg-btnnav" id="location"
              placeholder="Location">
            <label for="location">Location</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="newEvent.capacity" type="number" class="form-control bg-btnnav" id="capacity"
              placeholder="Capacity">
            <label for="capacity">Capacity</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="newEvent.startDate" type="Date" class="form-control bg-btnnav text-light" id="startDate"
              placeholder="Start Date">
            <label for="startDate">Start Date</label>
          </div>
          <div class="form-floating mb-3">
            <select v-model="newEvent.type" class="form-select bg-btnnav text-light" id="type">
              <option value="concert">Concert</option>
              <option value="convention">Convention</option>
              <option value="sport">Sport</option>
              <option value="digital">Digital</option>
            </select>
            <label for="type">Type</label>
          </div>
          <button type="submit" class="btn btn-outline-light ">Create</button>
        </form>
      </div>
    </div>
  </footer>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { eventsService } from "./services/EventsService.js"
import { logger } from "./utils/Logger.js"
import Pop from "./utils/Pop.js"
import { Offcanvas } from "bootstrap"
import { useRouter } from "vue-router"

export default {
  setup() {
    const newEvent = ref({})
    const router = useRouter()
    return {
      newEvent,

      async createEvent() {
        try {
          const event = await eventsService.createEvent(newEvent.value)
          router.push({ name: 'EventDetails', params: { eventId: event.id } })
          newEvent.value = {}
          Offcanvas.getOrCreateInstance('#EventForm').hide()
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      }

    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

main {
  background-color: #2A2D3A;
}

.bg-btnnav {
  background-color: #474C61;
}
</style>
