<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="pa-4" color="#FFECB3" elevation="4">
      <v-img
        :src="location.image || 'https://via.placeholder.com/400x200'"
        height="180"
        class="rounded"
        cover
      />
      <v-card-title class="text-h6 mt-2">{{ location.name }}</v-card-title>
      <v-card-subtitle>{{ location.address }}</v-card-subtitle>
      <v-card-text>{{ location.description }}</v-card-text>
    </v-card>
  </v-col>
</template>

<script setup>
defineProps({
  location: {
    type: Object,
    required: true
  }
})
</script>