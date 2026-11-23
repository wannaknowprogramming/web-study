const apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=12';
const postsElement = document.querySelector('#posts');
const statusElement = document.querySelector('#status');
const searchElement = document.querySelector('#search');
let posts = [];

function drawPosts(items) {
  postsElement.innerHTML = items.map((post) => `
    <article class="post">
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    </article>
  `).join('');
  statusElement.textContent = items.length ? `Найдено публикаций: ${items.length}` : 'Ничего не найдено';
}

async function loadPosts() {
  statusElement.textContent = 'Загрузка...';
  postsElement.innerHTML = '';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Сервер вернул ошибку');
    posts = await response.json();
    drawPosts(posts);
  } catch (error) {
    statusElement.textContent = `Не удалось загрузить данные: ${error.message}`;
  }
}

searchElement.addEventListener('input', () => {
  const query = searchElement.value.trim().toLowerCase();
  drawPosts(posts.filter((post) => post.title.includes(query)));
});
document.querySelector('#reload').addEventListener('click', loadPosts);
loadPosts();
