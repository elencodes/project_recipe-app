import { useEffect, useRef, useState } from 'react';
import { useBlocker } from 'react-router';

export const useUnsavedChanges = (isDirty: boolean) => {
    const [showModal, setShowModal] = useState(false);
    const [onContinue, setOnContinue] = useState<(() => void) | null>(null);
    const savedRef = useRef(false);

    const blocker = useBlocker(() => isDirty && !savedRef.current);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setShowModal(true);
            setOnContinue(() => blocker.proceed);
        }
    }, [blocker]);

    const confirmLeave = () => {
        savedRef.current = true;
        setShowModal(false);
        onContinue?.();
    };

    const cancelLeave = () => {
        setShowModal(false);
        blocker.reset?.();
    };

    const markAsSaved = () => {
        savedRef.current = true;
    };

    return {
        showModal,
        confirmLeave,
        cancelLeave,
        markAsSaved,
    };
};
