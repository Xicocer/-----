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
const error = ref('')
const valid = ref(false)
const formRef = ref(null)

async function addLocation() {
    if (!formRef.value.validate()) {
        return
    }
    error.value = ''
    try {
        await axios.post('http://localhost:5000/admin/location', {
            name: locationName.value,
            description: locationDescription.value,
            address: locationAddress.value,
        }, { withCredentials: true })
        alert('Локация успешно добавлена')
    } catch (e) {
        error.value = e.response?.data?.message || 'Ошибка при добавлении локации'
    }
}
</script>
