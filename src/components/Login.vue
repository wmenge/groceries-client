<script setup lang="js">
  import.meta.env.VITE_API_URL
  const apiUrl = import.meta.env.VITE_API_URL
  import { useI18n } from 'vue-i18n'
  import { ref, onMounted } from 'vue'
  import { getCookie, setCookie } from '../util/cookies.js'

  const { t } = useI18n() 
  const loading = ref(false);

  onMounted(() => {
    navigateToRememberedProvider();
  })

  function navigateToRememberedProvider() {
    var provider = getCookie('oauth_provider');

    if (provider) {
      loading.value = true;
      document.location = document.getElementById(provider).href;
    }
  }

  function rememberProvider(e) {
    setCookie('oauth_provider', e.target.id);
  }
</script>

<template>

  <div class="wrapper container mt-3">

    <div v-if="loading" class="position-absolute start-50 mt-1 spinner-container">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="!loading">
    
      <div class="jumbotron">
        <h1 class="display-6">{{ $t("titles.login") }}:</h1>
        <hr class="my-4">
        <p class="lead">
          <a id="google" @click="rememberProvider" class="btn btn-primary btn-lg" :href="`${ apiUrl }/auth/google/redirect`">Google</a> &nbsp;
          <a id="github" @click="rememberProvider" class="btn btn-secondary btn-lg" :href="`${ apiUrl }/auth/github/redirect`">Github</a>
        </p>
      </div>

    </div>

  </div>

</template>

<style scoped>

.jumbotron {
  padding: 4rem 2rem;
  background-color: #eeeeee;
  border-radius: .5rem;
}


</style>
