<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Бронирования
        <v-spacer />
        <v-btn icon @click="fetchBookings">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="bookings"
        :items-per-page="limit"
        :page.sync="page"
        :loading="loading"
        class="elevation-1"
        :server-items-length="total"
      >
        <template #item.startTime="{ item }">
          {{ item.startTime }}
        </template>

        <template #item.endTime="{ item }">
          {{ item.endTime }}
        </template>

        <template #item.createdAt="{ item }">
          {{ item.createdAt }}
        </template>

        <template #item.actions="{ item }">
          <v-btn small color="green" @click="confirmBooking(item.id)">
            Подтвердить
          </v-btn>
          <v-btn small color="red" @click="deleteBooking(item.id)">
            Удалить
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const bookings = ref([])
const page = ref(1)
const limit = ref(5)
const total = ref(0)
const loading = ref(false)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Email', key: 'email' },
  { title: 'Телефон', key: 'phone' },
  { title: 'Имя', key: 'name' },
  { title: 'Посетители', key: 'visitors' },
  { title: 'Статус', key: 'status' },
  { title: 'Начало', key: 'startTime' },
  { title: 'Конец', key: 'endTime' },
  { title: 'Создано', key: 'createdAt' },
  { title: 'Действия', key: 'actions', sortable: false },
]

const fetchBookings = async () => {
  try {
    loading.value = true
    const { data } = await axios.get(
      `http://localhost:5000/admin/bookings?page=${page.value}&limit=${limit.value}`,
      { withCredentials: true }
    )
    bookings.value = data.data
    total.value = data.meta.total
  } catch (error) {
    console.error('Ошибка загрузки бронирований:', error)
  } finally {
    loading.value = false
  }
}

const confirmBooking = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/admin/booking/${id}`,
      { status: 'Подтверждено' },
      { withCredentials: true }
    )
    fetchBookings()
  } catch (error) {
    console.error('Ошибка подтверждения бронирования:', error)
  }
}

const deleteBooking = async (id) => {
  if (!confirm('Удалить это бронирование?')) return
  try {
    await axios.delete(`http://localhost:5000/admin/booking/${id}`, { withCredentials: true })
    fetchBookings()
  } catch (error) {
    console.error('Ошибка удаления бронирования:', error)
  }
}

watch([page, limit], fetchBookings)
onMounted(fetchBookings)
</script>
