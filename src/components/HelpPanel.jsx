import Panel from './Panel.jsx';

export default function HelpPanel({ children }) {
    return (
        <Panel title="Справка">
            <p>Откройте раздел, чтобы прочитать ответ.</p>
            {children}
        </Panel>
    );
}
    