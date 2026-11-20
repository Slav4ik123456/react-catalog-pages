import { useState } from 'react';

export default function useDisclosure(initialOpen = false) {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const toggle = () => setIsOpen(value => !value);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, toggle, open, close };
}
