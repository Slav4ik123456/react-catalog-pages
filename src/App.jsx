import { useRef, useState } from 'react';
import HelpPanel from './components/HelpPanel.jsx';
import Disclosure from './components/Disclosure.jsx';
import LegacyNote from './components/LegacyNote.jsx';
import TitleDemo from './components/TitleDemo.jsx';
import useFocus from './hooks/useFocus.js';

const disclosuresData = [
  {
    id: 1,
    title: 'Что такое компонент?',
    content: <p>Компонент описывает часть интерфейса.</p>
  },
  {
    id: 2,
    title: 'Зачем нужен хук?',
    content: (
      <>
        <p>Хук позволяет повторно использовать логику.</p>
        <label>
          Заметка
          <input placeholder="Введите свой пример" />
        </label>
      </>
    )
  },
  {
    id: 3,
    title: 'Pudge - кто это?',
    content: <p>Это мифическое существо.</p>
  }
];

export default function App() {
  const detailsRef = useRef(null);
  const mainRef = useRef(null);

  const searchFocus = useFocus();
  const extraFocus = useFocus();

  const [filterQuery, setFilterQuery] = useState('');
  const [showTitleDemo, setShowTitleDemo] = useState(false);

  const filteredDisclosures = disclosuresData.filter(item =>
    item.title.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleScrollToTop = () => {
    mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="app" ref={mainRef}>
      <h1>Справочник по React</h1>

      <div style={{ margin: '16px 0', padding: '12px', background: '#e3f2fd', borderRadius: '8px' }}>
        <strong>🧪 Проверка useDocumentTitle:</strong><br />
        <button
          type="button"
          onClick={() => setShowTitleDemo(prev => !prev)}
          style={{ marginTop: '8px' }}
        >
          {showTitleDemo ? '🚫 Размонтировать TitleDemo' : '✅ Смонтировать TitleDemo'}
        </button>
        {showTitleDemo && <TitleDemo />}
      </div>



      <div style={{ margin: '16px 0' }}>
        <label htmlFor="filter">Фильтр разделов: </label>
        <input
          id="filter"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Введите часть заголовка..."
        />
      </div>

      <label htmlFor="search">Поле поиска</label>
      <input id="search" ref={searchFocus.ref} />

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="extra">Дополнительное поле</label>
        <input id="extra" ref={extraFocus.ref} />
      </div>

      <div className="actions">
        <button type="button" onClick={searchFocus.focus}>В поле поиска</button>
        <button type="button" onClick={extraFocus.focus}>В доп. поле</button>
        <button type="button" onClick={() =>
          detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          К описанию
        </button>
      </div>

      <HelpPanel>
        {filteredDisclosures.map(item => (
          <Disclosure
            key={item.id}
            title={item.title}
            initialOpen={item.id === 3}
          >
            {item.content}
          </Disclosure>
        ))}
        {filteredDisclosures.length === 0 && (
          <p style={{ color: '#888' }}>Разделы не найдены.</p>
        )}
      </HelpPanel>

      <LegacyNote text="9898546546657498712321654723" />
      <div className="spacer" aria-hidden="true" />
      <section ref={detailsRef}>
        <h2>Описание проекта</h2>
        <p>DOM, композиция и собственный хук.</p>
      </section>
      <button type="button" onClick={handleScrollToTop}>
        ⬆ Наверх
      </button>
    </main>
  );
}