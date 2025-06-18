<template>
  <NavMenue />
  <v-container class="py-10 pokemon-bg">
    <h2 class="text-h4 font-weight-bold mb-6 text-center search-header">Поиск локации</h2>

    <v-text-field
      v-model="search"
      label="Введите название локации"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      class="mb-6 search-header text-h6 search-input"
      color="orange-darken-2"
    />
    

    <v-row dense>
      <LocationCard
        v-for="location in filteredLocations"
        :key="location.id"
        :location="location"
      />
    </v-row>
  </v-container>
  <PokeFooter />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const locations = ref([])
const search = ref('')

const getLocations = async () => {
  try {
    const response = await axios.get('http://localhost:5000/user/locations')
    locations.value = response.data
  } catch (error) {
    console.error('Ошибка при получении локаций:', error)
  }
}

onMounted(() => {
  getLocations()
})

const filteredLocations = computed(() => {
  return locations.value.filter((loc) =>
    loc.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped>
.pokemon-bg {
  background-color: #fff3e0;
  background-image: url('@/assets/Abra.png');
  background-position: 102% -8vh;
  background-size: 22vw;
  max-width: 100%;
}

.search-header {
  color: #e65100;
  font-family: 'Fredoka', sans-serif;
}

.search-input {
  max-width: 80vw;
}
</style>