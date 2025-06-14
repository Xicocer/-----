    <template>
    <section class="booking-section">
        <h2 class="section-title">Как забронировать праздник?</h2>

        <div class="steps">
        <div
            v-for="(step, index) in steps"
            :key="index"
            class="step-card"
            :style="{ backgroundColor: step.color }"
        >
            <v-icon size="48" color="indigo-darken-4" class="mb-3">
            {{ step.icon }}
            </v-icon>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
        </div>
        </div>

    </section>
    </template>

    <script setup>
    const steps = [
    {
        title: 'Выберите локацию',
        icon: 'mdi-map-marker-radius',
        description: 'Найдите ближайшую площадку или парк.',
        color: '#FF6F00',
    },
    {
        title: 'Выберите зону',
        icon: 'mdi-pokeball',
        description: 'Игровая, фотозона или квест-зона.',
        color: '#FF6F00',
    },
    {
        title: 'Укажите количество',
        icon: 'mdi-account-group',
        description: 'Сколько детей будет участвовать?',
        color: '#FF6F00',
    },
    {
        title: 'Выберите время',
        icon: 'mdi-clock-outline',
        description: 'Утро, день или вечер — как вам удобно.',
        color: '#FF6F00',
    },
    {
        title: 'Выберите дату',
        icon: 'mdi-calendar-month',
        description: 'Забронируйте удобный день заранее.',
        color: '#FF6F00',
    },
    ];
    </script>

    <style scoped>
    .booking-section {
        position: relative;
        padding: 48px 24px;
        background-color: #f5f5f5;
        background-image: url('@/assets/чармандер.png');
        background-position: 110% 50%;
        background-size: contain;
        text-align: center;
        overflow: hidden;
    }

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
  color: #2a2a2a;
  font-family: 'Fredoka', sans-serif;
}

.steps {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  z-index: 1;
  position: relative;
}

.step-card {
  width: 220px;
  padding: 24px;
  border-radius: 20px;
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
  background-blend-mode: multiply;
}

.step-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.step-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.step-description {
  font-size: 0.95rem;
}

/* Фоновый чармандер */
.charmander-bg {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 320px;
  opacity: 0.2;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}


    </style>
