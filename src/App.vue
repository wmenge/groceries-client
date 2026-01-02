<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n() 
  const apiUrl = import.meta.env.VITE_API_URL
  import { setCookie } from './util/cookies.js'

  function clearProvider() {
    setCookie('oauth_provider', '');
  }
</script>

<template>
    <header>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <RouterLink to="/" class="navbar-brand">{{ $t("titles.appTitle") }}</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/shopping-lists" class="nav-link active">{{ $t("titles.lists") }}</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/groceries" class="nav-link">{{ $t("titles.groceries") }}</RouterLink>
        </li>
        <li class="nav-item">
          <a href="https://welbonusgeendata.nl" target="_blank" class="nav-link">{{ $t("titles.loaltycard") }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" @click="clearProvider" :href="`${ apiUrl }/auth/logout`">{{ $t("titles.logout") }}</a>
        </li>
      </ul>
    </div>
    
  </div>
</nav>
  
  </header>

  <main>
    
    

      <!-- <RouterView/> -->
      
      <router-view v-slot="{ Component }">
  <transition name="slide">
    <component :is="Component" />
  </transition>
</router-view>

  </main>
</template>

<style>

.wrapper {
  width: 100%;
  position: absolute;
  min-height: 100vh;
}

.slide-enter-active,
.slide-leave-active {
  transition: all .75s ease-in-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  opacity: 0;
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  opacity: 0;
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
  
</style>
