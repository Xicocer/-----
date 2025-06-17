<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card width="400">
      <v-card-title class="text-h5">Админ вход</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login" ref="formRef" v-model="valid">
          <v-text-field
            v-model="username"
            label="Логин"
            :rules="[v => !!v || 'Введите логин']"
            required
          />
          <v-text-field
            v-model="password"
            label="Пароль"
            :rules="[v => !!v || 'Введите пароль']"
            type="password"
            required
          />
          <v-btn type="submit" :disabled="!valid" color="primary" block>Войти</v-btn>
        </v-form>
        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')
const error = ref('')
const valid = ref(false)
const formRef = ref(null)

async function login() {
  if (!formRef.value.validate()) {
    return
  }
  error.value = ''
  try {
    await axios.post('http://localhost:5000/admin/login', {
      username: username.value,
      password: password.value,
    }, { withCredentials: true })
    alert('Успешный вход в админку')
    window.location.href = '/admin'
    
  } catch (e) {
    error.value = e.response?.data?.message || 'Ошибка при входе'
  }
}
</script>