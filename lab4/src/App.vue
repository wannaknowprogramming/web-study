<script setup>
import { computed, onMounted, ref } from 'vue';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=12';
const posts = ref([]);
const query = ref('');
const status = ref('Загрузка...');

const visiblePosts = computed(() => posts.value.filter((post) => post.title.includes(query.value.toLowerCase())));

async function loadPosts() {
  status.value = 'Загрузка...';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Сервер вернул ошибку');
    posts.value = await response.json();
    status.value = '';
  } catch (error) {
    status.value = `Не удалось загрузить данные: ${error.message}`;
  }
}

onMounted(loadPosts);
</script>

<template>
  <main class="container">
    <header>
      <p class="eyebrow">Лабораторная работа №4</p>
      <h1>Публикации на Vue</h1>
      <p>Компонентное приложение, использующее API JSONPlaceholder.</p>
    </header>
    <div class="toolbar"><input v-model="query" placeholder="Поиск по заголовку"><button @click="loadPosts">Обновить</button></div>
    <p class="status">{{ status || `Найдено публикаций: ${visiblePosts.length}` }}</p>
    <section class="posts">
      <article v-for="post in visiblePosts" :key="post.id" class="post"><h2>{{ post.title }}</h2><p>{{ post.body }}</p></article>
    </section>
  </main>
</template>
