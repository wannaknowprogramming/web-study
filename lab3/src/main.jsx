import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=12';

function PostCard({ post }) {
  return <article className="post"><h2>{post.title}</h2><p>{post.body}</p></article>;
}

function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Загрузка...');

  async function loadPosts() {
    setStatus('Загрузка...');
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Сервер вернул ошибку');
      const data = await response.json();
      setPosts(data);
      setStatus('');
    } catch (error) {
      setStatus(`Не удалось загрузить данные: ${error.message}`);
    }
  }

  useEffect(() => { loadPosts(); }, []);
  const visiblePosts = useMemo(() => posts.filter((post) => post.title.includes(query.toLowerCase())), [posts, query]);

  return <main className="container">
    <header><p className="eyebrow">Лабораторная работа №3</p><h1>Публикации на React</h1><p>Компонентное приложение, использующее API JSONPlaceholder.</p></header>
    <div className="toolbar"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по заголовку" /><button onClick={loadPosts}>Обновить</button></div>
    {status ? <p className="status">{status}</p> : <p className="status">Найдено публикаций: {visiblePosts.length}</p>}
    <section className="posts">{visiblePosts.map((post) => <PostCard key={post.id} post={post} />)}</section>
  </main>;
}

createRoot(document.querySelector('#root')).render(<App />);
