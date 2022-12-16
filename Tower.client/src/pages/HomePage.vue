<template>
  <div class="col-12">
    <!-- SECTION main cover photo -->
    <section class="row coverPhoto p-0  border border-info rounded mb-4">
      <div class="col-12 col-md-6 text-light d-flex flex-column justify-content-center p-5">
        <p class="fs-2 fw-bold"> Get ahead of the scalpers.</p>
        <p class="fs-2 fw-bold"> Reserve your seat now with</p>
        <p class="fs-2 fw-bold"> real events for real people.</p>
      </div>
    </section>
    <!-- SECTION events button navbar -->
    <section class="row justify-content-evenly bg-btnnav mb-4">
      <div @click="evalue = ''" class="text-center col-6 col-md-2 selectable border border-0 p-2">
        <p class="text-light m-0" title="All Events">All</p>
      </div>
      <div @click="evalue = 'concert'" class="text-center col-6 col-md-2 selectable border border-0 p-2">
        <p class="text-light m-0" title="Concerts">Concerts</p>
      </div>
      <div @click="evalue = 'convention'" class="text-center col-6 col-md-2 selectable border border-0 p-2">
        <p class="text-light m-0" title="Conventions">Conventions</p>
      </div>
      <div @click="evalue = 'sport'" class="text-center col-6 col-md-2 selectable border border-0 p-2">
        <p class="text-light m-0" title="Sports">Sports</p>
      </div>
      <div @click="evalue = 'digital'" class="text-center col-6 col-md-2 selectable border border-0 p-2">
        <p class="text-light m-0" title="Digitals">Digitals</p>
      </div>
    </section>
    <!-- SECTION events component -->
    <section class="row">
      <div v-for="e in events" class="col-6 col-md-3 text-light rounded mb-4">
        <EventCard :event="e" />
      </div>
    </section>
  </div>
</template>

<script>

import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js"

export default {
  setup() {
    const evalue = ref("")

    async function getAllEvents() {
      try {
        await eventsService.getAll()
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }
    onMounted(() => {
      getAllEvents();
    })
    return {
      evalue,
      events: computed(() => {
        if (evalue.value == "") {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == evalue.value)
        }
      }
      )


    }
  }
}
</script>

<style scoped lang="scss">
.coverPhoto {
  background-image: url('https://s3-alpha-sig.figma.com/img/cd1b/eb35/3224c652f40c0754047c232b09e71cc3?Expires=1672012800&Signature=RW1nLQQV8mXj05s9VlVTLiUq3suFwCVdXGSvgqCseygTB5HSQpBLsn8~rVTExXTnwq2VlhL5C7QVuGPD6fsQsP029P0524QX-tyTB~Nb2n335I0ITFjnW-ziH3D6N0Rb-bRK6FGjR7E~-VDM93YxsoQSXWM7Asbt-FBYhAcfYMWggffjcMa5pSPHHmvf4sI7msLEyLhCZBjCn3xvk~TJr4274BvOiqjoOWYg0e9e3l1mDIkFmTV4~~llzxH~999X6Yqv2jmRXHWcLtDJogvPNS8AL6vHwmQTatIXzN7HSpTlm6Epj7SorOu3SPAPqe3sqc7H~N1rcvL2OjNlHVJwYg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4');
  height: 30vh;
  width: 100%;
  object-fit: cover;
  object-position: top;
}

.bg-btnnav {
  background-color: #474C61;
}
</style>
