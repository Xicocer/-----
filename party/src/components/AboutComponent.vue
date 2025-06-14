<template>
  <section class="about-section">
    <div class="mission-box">
      <v-icon size="48" color="white" class="mb-2">mdi-star-shooting</v-icon>
      <h2 class="mission-title">Наша цель</h2>
      <p class="mission-text">Сделать праздничные дни незабываемыми для детей и их родителей</p>

      <v-icon size="48" color="white" class="mb-2 mt-6">mdi-sparkles</v-icon>
      <h2 class="mission-title">Наш девиз</h2>
      <p class="mission-text">Подарим волшебство для ваших детей</p>
    </div>  
  </section>
</template>

<style scoped>
.about-section {
  padding: 48px 24px;
  background-color: #f5f5f5;
  background-position: 0% 80%;
  background-size: contain;
  background-image: url('@/assets/бульбазавр.png');
  position: relative;
  text-align: center;
  font-family: 'Fredoka', sans-serif;
}

.mission-box {
  position: relative;
  left: 20%;
  background-color: #00897B;
  max-width: 40vw;
  border-radius: 24px;
  padding: 40px 24px;
  color: white;
  margin: 0 auto 48px auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.mission-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.mission-text {
  font-size: 1.1rem;
  margin-bottom: 16px;
}
</style>
