import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function TitleDemo() {
  useDocumentTitle('🔥 TitleDemo активен!');

  return (
    <div className="note" style={{ background: '#ffe0b2' }}>
      <p>
        <strong>⚡ TitleDemo смонтирован.</strong><br />
        Посмотрите на заголовок вкладки браузера — он изменился!<br />
        Размонтируйте компонент кнопкой ниже, и заголовок восстановится.
      </p>
    </div>
  );
}