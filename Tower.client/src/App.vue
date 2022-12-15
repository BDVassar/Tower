<template>
  <header>
  </header>
  <main class="container-fluid m-0">
    <section class="row">
      <div class="col-12 col-md-11">
        <section class="row">
          <router-link class="d-flex" :to="{ name: 'Home' }">
            <div class="d-flex flex-column align-items-center">
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
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
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
</style>
