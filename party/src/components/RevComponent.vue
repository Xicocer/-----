<template>
  <section class="reviews-section ">
    <h2 class="section-title"><span color="yellow-accent-4">Oтзывы наших клиентов</span></h2>
    <div class="reviews-slider review-list  ">
      <div class="review-card" v-for="(review, index) in reviews" :key="index">
        <img :src="review.avatar" alt="avatar" class="review-avatar" />
        <p class="review-text">"{{ review.text }}"</p>
        <div class="review-stars">
          <v-icon
            v-for="n in 5"
            :key="n"
            size="20"
            :color="n <= review.rating ? 'amber' : 'grey-lighten-1'"
          >
            mdi-star
          </v-icon>
        </div>
        <p class="review-author">— {{ review.author }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  {
    text: 'День рождения прошёл волшебно! Дети были в восторге от аниматоров и оформления.',
    author: 'Екатерина, мама Артёма',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    text: 'Очень всё организовано и весело! Понравилось, что всё под контролем.',
    author: 'Сергей, папа Лизы',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    text: 'Праздник получился невероятным! Рекомендую всем родителям.',
    author: 'Марина, бабушка Максима',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
  },

  {
  text: 'Спасибо за праздник! Всё было ярко, красочно и по-настоящему по-покемошному! Дочка в восторге!',
  author: 'Анна, мама Сони',
  rating: 5,
  avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
},
{
  text: 'Организация на высшем уровне! Даже взрослые повеселились — рекомендую!',
  author: 'Игорь, папа Тимура',
  rating: 4,
  avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
},
];
</script>

<style scoped>
.reviews-section {
  padding: 48px 24px;
  background-color: #fff3e0;
  background-position: 125% 80%;
  background-image: url('@/assets/флареон.png');
  text-align: center;
  font-family: 'Fredoka', sans-serif;
}

.reviews-slider {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 12px;
  justify-content: flex-start;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
  color: #e65100;
  font-family: 'Fredoka', sans-serif;
}

.review-card {
  flex: 0 0 280px;
  background-color: #ffffffb5;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  scroll-snap-align: start;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.review-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.2);
}

.review-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: 3px solid #FFD600;
}

.review-text {
  font-size: 1.2rem;
  margin-bottom: 12px;
  font-style: italic;
  color: #444;
}

.review-author {
  font-weight: 600;
  color: #2a2a2a;
  font-size: 0.9rem;
  margin-top: 8px;
}

.review-stars {
  margin-top: 8px;
  margin-bottom: 8px;
}

.review-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.review-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.review-list {
  -ms-overflow-style: none;  /* IE и Edge */
  scrollbar-width: none;     /* Firefox */
}
</style>
