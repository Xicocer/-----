<template>
  <v-app>
    <v-main class >
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>

<style scoped>
.v-application {
  background: linear-gradient(135deg, #fce4ec 0%, #e0f7fa 100%);
  background-image: url('/patterns/pokeball-pattern.svg');
  background-repeat: repeat;
  background-size: 200px;
  background-attachment: fixed;
}
</style>