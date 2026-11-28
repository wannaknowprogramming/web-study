import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './style.css';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=12';

function PostCard({ post }) {
  return <li className="post"><article><h2>{post.title}</h2><p>{post.body}</p></article></li>;
}

function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Загрузка...');

  async function loadPosts() {
    setStatus('Загрузка...');
    try {
      const response = await axios.get(apiUrl);
      setPosts(response.data);
      setStatus('');
    } catch (error) {
      setStatus(`Не удалось загрузить данные: ${error.message}`);
    }
  }

  useEffect(() => { loadPosts(); }, []);
  const visiblePosts = useMemo(() => posts.filter((post) => post.title.includes(query.toLowerCase())), [posts, query]);

  return <section className="container" aria-labelledby="page-title">
    <header><p className="eyebrow">Лабораторная работа №3</p><h1 id="page-title">Публикации на React</h1><p>Компонентное приложение, использующее API JSONPlaceholder.</p></header>
    <main>
      <div className="toolbar"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по заголовку" /><button onClick={loadPosts}>Обновить</button></div>
      {status ? <p className="status">{status}</p> : <p className="status">Найдено публикаций: {visiblePosts.length}</p>}
      <ul className="posts">{visiblePosts.map((post) => <PostCard key={post.id} post={post} />)}</ul>
    </main>
    <footer>Источник данных: JSONPlaceholder</footer>
  </section>;
}

createRoot(document.querySelector('#root')).render(<App />);
