<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="pa-4" color="#FFECB3" elevation="4">
      <v-img
        :src="location.imageUrl ? `http://localhost:5000${location.imageUrl}` : 'https://dummyimage.com/400x200/ffcc00/000000&text=No+Image'"
        height="180"
        class="rounded"
        cover
      />
      <p>{{ location.image }} </p> 
      <v-card-title class="text-h6 mt-2">{{ location.name }}</v-card-title>
      <v-card-subtitle>{{ location.address }}</v-card-subtitle>
      <v-card-text>{{ location.description }}</v-card-text>
      <v-card-text class="text-h6 font-weight-bold">
        Цена: {{ location.price }} руб.
      </v-card-text>

      <v-btn color="orange darken-2" class="mt-4" @click="dialog = true">
        Забронировать
      </v-btn>

      <!-- Модальное окно бронирования -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card class="pokemon-bg">
          <v-card-title class="search-header">Бронирование: {{ location.name }}</v-card-title>
          <v-card-text>
            <v-form ref="bookingForm" @submit.prevent="submitBooking">
              <v-text-field class="search-header" v-model="form.name" label="Ваше имя" required clearable />
              <v-text-field class="search-header" v-model="form.email" label="Email" placeholder="example@gmail.com" type="email" clearable required />
              <v-text-field class="search-header" v-model="form.phone" label="Телефон" placeholder="+7 986 756 23 36" required clearable />
              <v-text-field class="search-header" v-model="form.date" label="Дата" type="date" prepend-inner-icon="mdi-calendar" required />


              <v-img
                :src="location.zoneImg ? `http://localhost:5000${location.zoneImg}` : 'https://dummyimage.com/400x200/ffcc00/000000&text=No+Image'"
                height="180"
                class="rounded"
                cover
              />

              <!-- Мультиселект зон -->
              <v-select
                class="search-header"
                v-model="form.zoneIds"
                :items="zones"
                item-title="name"
                item-value="id"
                label="Выберите зоны"
                multiple
                chips
                required
              />

              <!-- Время начала -->
              <v-select
                class="search-header"
                v-model="form.startTime"
                :items="times"
                label="Начало бронирования"
                required
              />

              <!-- Время окончания (фильтруется по startTime) -->
              <v-select
                class="search-header"
                v-model="form.endTime"
                :items="filteredEndTimes"
                label="Окончание бронирования"
                :disabled="!form.startTime"
                required
              />

              <v-text-field
                class="search-header"
                v-model="form.visitors"
                label="Количество посетителей"
                type="number"
                min="1"
                max="50"
                required
              />

              <v-card-text class="text-h6 font-weight-bold price-color">
                Итого: {{ totalPrice }} ₽
              </v-card-text>

              <v-card-actions class="mt-4">
                <v-spacer />
                <v-btn text @click="dialog = false" color="red darken-2">Отмена</v-btn>
                <v-btn color="orange darken-2" type="submit">Забронировать</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-col>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { da } from 'vuetify/locale'

const props = defineProps({
  location: {
    type: Object,
    required: true
  }
})

console.log('LocationCard props:', props.location.zoneImg)

const dialog = ref(false)

// Временные слоты с шагом в 30 минут
const times = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00'
]

// Стейт формы
const form = ref({
  name: '',
  email: '',
  phone: '',
  zoneIds: [],
  startTime: '',
  endTime: '',
  visitors: 1,
  date: new Date().toISOString().split('T')[0] // Текущая дата в формате YYYY-MM-DD
})

const zones = ref([])

// Подгрузка зон при открытии диалога
watch(dialog, async (val) => {
  if (val) {
    try {
      const response = await axios.get(`http://localhost:5000/user/zones/${props.location.id}`)
      zones.value = response.data
      zones.value = zones.value.map(zone => ({
        id: zone.id,
        name:  `${zone.name} (${Number(zone.price)} ₽)`,
        price: zone.price
      }))
      console.log('Зоны:', zones.value)
    } catch (error) {
      console.error('Ошибка при загрузке зон:', error)
    }
  }
})

// Отфильтрованный список времени окончания
const filteredEndTimes = computed(() => {
  const startIndex = times.indexOf(form.value.startTime)
  return startIndex >= 0 ? times.slice(startIndex + 1) : []
})

// Сброс окончания при изменении начала
watch(() => form.value.startTime, () => {
  form.value.endTime = ''
})

// Подсчет цены бронирования
const totalPrice = computed(() => {
  const locationPrice = Number(props.location.price) || 0

  const selectedZones = zones.value.filter(zone => form.value.zoneIds.includes(zone.id))

  const zonesSum = selectedZones.reduce((sum, zone) => sum + Number(zone.price), 0)

  return locationPrice + zonesSum
})

// Отправка бронирования
const submitBooking = async () => {
  if (
    !form.value.name || !form.value.email || !form.value.phone ||
    !form.value.zoneIds.length || !form.value.startTime || !form.value.endTime ||
    !form.value.visitors
  ) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }

  try {

      await axios.post('http://localhost:5000/user/booking', {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        zoneIds: form.value.zoneIds,
        startTime: form.value.startTime,
        endTime: form.value.endTime,
        date: form.value.date,
        visitors: form.value.visitors,
        total: totalPrice.value
      })
    
    alert('Бронирование успешно создано')
    dialog.value = false
    form.value = {
      name: '',
      email: '',
      phone: '',
      zoneIds: [],
      startTime: '',
      endTime: '',
      visitors: 1,
    }
  } catch (error) {
    console.error('Ошибка при создании бронирования:', error)
    alert('Ошибка при создании бронирования')
  }
}
</script>

<style scoped>
.pokemon-bg {
  background-color: #FFECB3;
}

.search-header {
  color: #3E2723;
  font-family: 'Fredoka', sans-serif;
}

.price-color {
  color: #3E2723;
}
</style>
