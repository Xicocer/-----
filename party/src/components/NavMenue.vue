<template>
  <v-app-bar height="72" class="navbar px-6 " flat>
    <v-toolbar-title class="text-h5 font-weight-bold d-flex align-center">
      <img src="@/assets/ball3.png" alt="Pokeball" height="32" class="mr-2" />
      PokéParty
    </v-toolbar-title>

    <v-spacer />

    <RouterLink to="/" class="links"><v-btn class="nav-btn">Главная</v-btn></RouterLink>
    <RouterLink to="/search" class="links"><v-btn class="nav-btn">Поиск</v-btn></RouterLink>
  </v-app-bar>
</template>

<script setup>
import {RouterLink} from 'vue-router'
</script>

<style scoped>
.navbar {
  background-color: #f5f5f5;
  border-bottom: 2px solid #dedede;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.nav-btn {
  color: white;
  background-color: #FF6F00;
  font-weight: 600;
  border-radius: 12px;
  margin-left: 0.5rem;
  text-transform: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.links {
  color: white;
  text-decoration: none;
}
</style>
