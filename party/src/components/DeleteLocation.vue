<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-spacer />
        <v-btn icon @click="fetchMarkers">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="locations"
        :items-per-page="limit"
        :page.sync="page"
        :loading="loading"
        class="elevation-1"
        :server-items-length="total"
      >
        <template #item.imageUrl="{ item }">
          <v-img
            v-if="item.imageUrl"
            :src="item.imageUrl"
            max-width="100"
            max-height="60"
            contain
          />
          <span v-else>—</span>
        </template>

        <template #item.created_at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>

        <template #item.actions="{ item }">
          <v-btn size="small" color="red" icon @click="deleteLocation(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const locations = ref([])
const page = ref(1)
const limit = ref(5)
const total = ref(0)
const loading = ref(false)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Название', key: 'name' },
  { title: 'Описание', key: 'description' },
  { title: 'Изображение', key: 'imageUrl' },
  { title: 'Дата создания', key: 'created_at' },
  { title: 'Действия', key: 'actions', sortable: false },
]

const formatDate = (date) => {
  return date ? new Date(date).toLocaleString() : '—'
}

const fetchMarkers = async () => {
  try {
    loading.value = true
    const { data } = await axios.get(`http://localhost:5000/admin/locations?page=${page.value}&limit=${limit.value}`, { withCredentials: true })
    if (data.success) {
      locations.value = data.data
      total.value = data.meta.total
    } else {
      console.error('Ошибка при получении локаций')
    }
  } catch (err) {
    console.error('Ошибка загрузки локаций:', err)
  } finally {
    loading.value = false
  }
}

const deleteLocation = async (id) => {
  if (!confirm('Удалить эту локацию?')) return
  try {
    await axios.delete(`http://localhost:5000/admin/location/${id}`, { withCredentials: true })
    await fetchMarkers()
  } catch (error) {
    console.error('Ошибка при удалении:', error)
  }
}

watch([page, limit], fetchMarkers)
onMounted(fetchMarkers)
</script>
