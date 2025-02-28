<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 
  
</script>

<template>
    <header>
  <!-- <nav class="navbar bg-body-tertiary bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <RouterLink class="navbar-brand mb-0 h1" to="/">Boodschappen</RouterLink>
    <button class="btn btn-outline-light" type="button"><i class="bi bi-plus-lg"></i></button>
  </div>
</nav> -->

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">{{ $t("titles.appTitle") }}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/shopping-lists">{{ $t("titles.lists") }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/groceries">{{ $t("titles.groceries") }}</a>
        </li>
        <!-- <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> -->
      </ul>
      <!-- <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
    </div>
    
  </div>
</nav>
  
  </header>

  <main>
    
    <div class="container mt-3">
      
      <RouterView />

  </div>
  </main>
</template>
