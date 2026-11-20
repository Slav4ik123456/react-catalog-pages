import { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/products.php', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setStatus('success');
      })
      .catch(error => {
        if (controller.signal.aborted) return;
        setError(error.message);
        setStatus('error');
      });
    return () => controller.abort();
  }, [attempt]);
  if (status === 'loading') return <p>Загрузка…</p>;
  if (status === 'error') return (
    <div><p role="alert">Ошибка: {error}</p>
      <button onClick={() => {
        setStatus('loading');
        setAttempt(n => n + 1);
      }}>Повторить</button></div>
  );
  return (
    <main><h1>Каталог</h1>
      {products.length === 0 ? <p>Товаров пока нет</p> :
        <ul>{products.map(product => (
          <li key={product.id}>{product.name}: {product.qty} шт.</li>
        ))}</ul>}
    </main>
  );
}
