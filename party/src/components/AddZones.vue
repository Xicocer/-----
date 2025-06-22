<template>
  <v-card class="pa-4">
    <v-card-title>Управление зонами локации</v-card-title>

    <v-card-text>
      <!-- Добавление зоны -->
      <v-select
        v-model="selectedLocation"
        :items="locations"
        item-title="name"
        item-value="id"
        label="Выберите локацию"
        return-object
        density="compact"
        variant="outlined"
        :loading="isLoading"
        :disabled="isLoading"
      />

      <v-text-field
        v-model="zoneName"
        label="Название зоны"
        variant="outlined"
        density="compact"
        class="mt-4"
        :disabled="!selectedLocation"
      />

      <v-text-field
        v-model="zonePrice"
        type="number"
        label="Цена аренды зоны"
        variant="outlined"
        density="compact"
        class="mt-4"
        :disabled="!selectedLocation"
      />
      <v-btn
        :disabled="!selectedLocation || !zoneName"
        color="primary"
        class="mt-4"
        block
        @click="submitZone"
      >
        Добавить зону
      </v-btn>

      <v-divider class="my-6" />

      <!-- Удаление зоны -->
      <v-select
        v-model="selectedLocationForDelete"
        :items="locations"
        item-title="name"
        item-value="id"
        label="Выберите локацию для удаления зоны"
        density="compact"
        variant="outlined"
        @update:modelValue="fetchZones"
        clearable
      />

      <v-select
        v-model="selectedZoneId"
        :items="zones"
        item-title="name"
        item-value="id"
        label="Выберите зону"
        :disabled="!selectedLocationForDelete || zones.length === 0"
        class="mt-4"
        clearable
        density="compact"
        variant="outlined"
      />

      <v-btn
        class="mt-4"
        color="error"
        :disabled="!selectedZoneId"
        @click="deleteZone"
        block
      >
        Удалить зону
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const locations = ref([])
const isLoading = ref(false)

const selectedLocation = ref(null)
const zoneName = ref('')
const zonePrice = ref('')
const selectedLocationForDelete = ref(null)
const zones = ref([])
const selectedZoneId = ref(null)

const fetchLocations = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get('http://localhost:5000/user/locations', {
      withCredentials: true
    })
    locations.value = data.locations || data // зависит от API
  } catch (e) {
    console.error('Ошибка получения локаций:', e)
  } finally {
    isLoading.value = false
  }
}

const fetchZones = async (locationId) => {
  if (!locationId) {
    zones.value = []
    return
  }

  try {
    const { data } = await axios.get(`http://localhost:5000/admin/zones/${locationId}`, {
      withCredentials: true
    })
    zones.value = data
    selectedZoneId.value = null
  } catch (e) {
    console.error('Ошибка загрузки зон:', e)
    zones.value = []
  }
}

const submitZone = async () => {
  if (!selectedLocation.value || !zoneName.value) return

  try {
    await axios.post('http://localhost:5000/admin/zone', {
      locationId: selectedLocation.value.id,
      name: zoneName.value,
      price: zonePrice.value 
    }, { withCredentials: true })

    zoneName.value = ''
    selectedLocation.value = null
    await fetchLocations()
    alert('Зона успешно добавлена!')
  } catch (e) {
    console.error('Ошибка добавления зоны:', e)
    alert('Ошибка добавления зоны')
  }
}

const deleteZone = async () => {
  if (!selectedZoneId.value) return

  try {
    await axios.delete(`http://localhost:5000/admin/zone/${selectedZoneId.value}`, {
      withCredentials: true
    })

    zones.value = zones.value.filter(z => z.id !== selectedZoneId.value)
    selectedZoneId.value = null
    alert('Зона успешно удалена!')
  } catch (e) {
    console.error('Ошибка удаления зоны:', e)
    alert('Не удалось удалить зону')
  }
}

onMounted(fetchLocations)
</script>
