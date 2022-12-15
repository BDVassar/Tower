<template>
  <nav class=" row gap-2 justify-content-center align-items-start navbar navbar-expand-lg navbar-dark">
    <div v-if="!user.isAuthenticated">
      <div class="col-12 mb-2">
        <button class="btn loginBtn btn-light w-75" @click="login">
          Login
        </button>
      </div>
      <div class="col-12">
        <router-link :to="{ name: 'Home' }">
          <button class="btn btn-outline-light w-75">
            Home
          </button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <div v-if="account.picture || user.picture" type="button" class=" border-0 selectable no-select col-12">
        <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
      </div>
      <div class="col-12">
        <router-link :to="{ name: 'Home' }">
          <button class="btn btn-outline-light">
            Home
          </button>
        </router-link>
      </div>
      <div class="list-group">
        <router-link :to="{ name: 'Account' }">
          <div class="selectable">
            Manage Account
          </div>
        </router-link>
        <div class="text-danger selectable" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
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
a:hover {
  text-decoration: none;
}

.loginBtn {
  background-color: #79E7AB;
}

@media screen and (min-width: 768px) {
  nav {
    height: 100%;
  }
}
</style>
