import { useId, useRef } from 'react';
import useDisclosure from '../hooks/useDisclosure.js';

export default function Disclosure({ title, children, initialOpen = false }) {
    const { isOpen, toggle, close } = useDisclosure(initialOpen);
    const contentId = useId();
    const triggerRef = useRef(null);

    function closeAndFocus() {
        close();
        triggerRef.current?.focus();
    }

    return (
        <article className="disclosure">
            <h3>
                <button
                    type="button"
                    ref={triggerRef}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={toggle}
                >
                    {title}
                </button>
            </h3>
            <div id={contentId} hidden={!isOpen}>
                {children}
                <button type="button" onClick={closeAndFocus}>
                    Закрыть раздел
                </button>
            </div>
        </article>
    );
}