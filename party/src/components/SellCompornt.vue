<template>
  <section class="promo-section">
    <h2 class="section-title">Наши акции</h2>
    <div class="promo-list">
      <div
        v-for="(promo, index) in promotions"
        :key="index"
        class="promo-card"
      >
        <img :src="promo.image" :alt="promo.title" class="promo-image" />
        <div class="promo-content">
          <h3 class="promo-title">{{ promo.title }}</h3>
          <p class="promo-description">{{ promo.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const promotions = [
  {
    title: 'Скидка 20% на первый праздник',
    description: 'Новым клиентам дарим скидку на первый заказ. Сделайте первый праздник ярким и выгодным!',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', 
  },
  {
    title: 'Фотозона в подарок!',
    description: 'При бронировании на группу от 10 детей — красочная фотозона бесплатно!',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', 
  },
  {
    title: 'Каждому ребёнку — подарок!',
    description: 'Подарки и сувениры с любимыми персонажами — каждому участнику!',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', 
  },
];
</script>

<style scoped>
.promo-section {
  padding: 48px 24px;
  background-color: #fff3e0;
  background-position: 0% 80%;
  background-image: url('@/assets/пикачу.png');
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
  color: #e65100;
  font-family: 'Fredoka', sans-serif;
}

.promo-list {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.promo-card {
  width: 280px;
  background-color: #ffcc80;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  text-align: center;
}

.promo-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.promo-image {
  width: 96px;
  height: 96px;
  object-fit: contain;
  margin-bottom: 12px;
}

.promo-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #4e342e;
}

.promo-description {
  font-size: 0.95rem;
  color: #5d4037;
}
</style>