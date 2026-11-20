import { useRef } from 'react';

export default function useFocus() {
    const ref = useRef(null);

    const focus = () => {
        ref.current?.focus();
    };

    return { ref, focus };
}