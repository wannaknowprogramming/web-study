<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=12';
const posts = ref([]);
const query = ref('');
const status = ref('Загрузка...');

const visiblePosts = computed(() => posts.value.filter((post) => post.title.includes(query.value.toLowerCase())));

async function loadPosts() {
  status.value = 'Загрузка...';
  try {
    const response = await axios.get(apiUrl);
    posts.value = response.data;
    status.value = '';
  } catch (error) {
    status.value = `Не удалось загрузить данные: ${error.message}`;
  }
}

onMounted(loadPosts);
</script>

<template>
  <section class="container" aria-labelledby="page-title">
    <header>
      <p class="eyebrow">Лабораторная работа №4</p>
      <h1 id="page-title">Публикации на Vue</h1>
      <p>Компонентное приложение, использующее API JSONPlaceholder.</p>
    </header>
    <main>
      <div class="toolbar"><input v-model="query" placeholder="Поиск по заголовку"><button @click="loadPosts">Обновить</button></div>
      <p class="status">{{ status || `Найдено публикаций: ${visiblePosts.length}` }}</p>
      <ul class="posts">
        <li v-for="post in visiblePosts" :key="post.id" class="post"><article><h2>{{ post.title }}</h2><p>{{ post.body }}</p></article></li>
      </ul>
    </main>
    <footer>Источник данных: JSONPlaceholder</footer>
  </section>
</template>
