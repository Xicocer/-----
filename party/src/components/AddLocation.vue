<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="addLocation" ref="formRef" v-model="valid">
          <v-text-field
            v-model="locationName"
            label="Название локации"
            :rules="[v => !!v || 'Введите название']"
            required
          />
          <v-text-field
            v-model="locationDescription"
            label="Описание локации"
            :rules="[v => !!v || 'Введите описание']"
            required
          />
          <v-text-field
            v-model="locationAddress"
            label="Адрес локации"
            :rules="[v => !!v || 'Введите адрес локации']"
            required
          />

          <v-text-field
            v-model="locationPrice"
            type="number"
            label="Аренда локации в денежках"
            :rules="[v => !!v || 'Введите адрес локации']"
            required
          />

          <v-file-input
            v-model="imageFile"
            label="Изображение локации"
            accept="image/*"
            prepend-icon="mdi-image"
            :rules="[v => !!v || 'Выберите изображение']"
            required
          />

          <v-btn type="submit" :disabled="!valid" color="primary" block>Добавить</v-btn>
        </v-form>

        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const locationName = ref('')
const locationDescription = ref('')
const locationAddress = ref('')
const locationPrice = ref('')
const imageFile = ref(null)
const error = ref('')
const valid = ref(false)
const formRef = ref(null)

async function addLocation() {
  if (!formRef.value.validate()) {
    return
  }
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('name', locationName.value)
    formData.append('description', locationDescription.value)
    formData.append('address', locationAddress.value)
    formData.append('price', locationPrice.value)
    formData.append('imageUrl', imageFile.value)

    console.log('Отправляем данные на сервер:')
    console.log('Название:', locationName.value) 
    console.log('Описание:', locationDescription.value)
    console.log('Адрес:', locationAddress.value)

    console.log(formData)

    await axios.post('http://localhost:5000/admin/location', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    alert('Локация успешно добавлена')
    locationName.value = ''
    locationDescription.value = ''
    locationAddress.value = ''
    imageFile.value = null
    formRef.value.resetValidation()

  } catch (e) {
    error.value = e.response?.data?.message || 'Ошибка при добавлении локации'
  }
}
</script>
