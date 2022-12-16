<template>
  <nav class=" row justify-content-center align-items-start navbar navbar-expand-lg navbar-dark">
    <div v-if="!user.isAuthenticated">
      <div class="col-12 mb-3">
        <button class="btn loginBtn btn-light w-100" @click="login">
          Login
        </button>
      </div>
      <div class="col-12">
        <router-link :to="{ name: 'Home' }">
          <button class="btn btn-outline-light w-100">
            Home
          </button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="col-12 text-center mb-3">
        <div v-if="account.picture || user.picture" type="button" class=" border-0 selectable no-select col-12">
          <img :src="account.picture || user.picture" alt="account photo" height="80" class="rounded" />
        </div>
      </div>
      <div class="col-12 mb-3">
        <router-link :to="{ name: 'Home' }">
          <button class="btn btn-outline-light w-100 mainBtncolor p-1">
            Home
          </button>
        </router-link>
      </div>
      <div class="col-12 mb-3">
        <router-link :to="{ name: 'Account' }">
          <button class="btn btn-outline-light w-100 mainBtncolor p-1">
            Account
          </button>
        </router-link>
      </div>
      <div class="col-12 mb-3">
        <button class="btn btn-outline-light w-100 mainBtncolor p-1" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDark" aria-controls="Create Event">
          New Event
        </button>
      </div>
      <div class="col-12">
        <button class="btn btn-outline-danger w-100 p-1" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.loginBtn {
  background-color: #79E7AB;
}

.mainBtncolor {
  color: #56C7FB;
  border-color: #56C7FB;
}

@media screen and (min-width: 768px) {
  nav {
    height: 100%;
  }
}
</style>
