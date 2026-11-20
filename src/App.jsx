import { useEffect, useState, useMemo } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    // Загружаем из JSON файла в папке public
    fetch(import.meta.env.BASE_URL + 'products.json', { signal: controller.signal })
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

  // Поиск по названию продукта
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(needle)
    );
  }, [products, query]);

  if (status === 'loading') return <p>Загрузка…</p>;
  if (status === 'error') return (
    <div>
      <p role="alert">Ошибка: {error}</p>
      <button onClick={() => {
        setStatus('loading');
        setAttempt(n => n + 1);
      }}>Повторить</button>
    </div>
  );

  return (
    <main>
      <h1>Каталог</h1>

      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '16px', padding: '8px', width: '300px' }}
      />

      {visible.length === 0 ? (
        <p>{query ? 'Ничего не найдено' : 'Товаров пока нет'}</p>
      ) : (
        <ul>
          {visible.map(product => (
            <li key={product.id}>{product.name}: {product.qty} шт.</li>
          ))}
        </ul>
      )}
    </main>
  );
}