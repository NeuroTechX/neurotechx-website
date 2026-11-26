'use client';

import { useSyncExternalStore } from 'react';

const prefix = 'neurotechx:primer:passed:';
const changed = 'neurotechx:primer-progress';
const temporary = new Set<string>();

export function markQuestionPassed(questionKey: string) {
    try {
        if (window.localStorage.getItem(prefix + questionKey) === '1') return;
        window.localStorage.setItem(prefix + questionKey, '1');
    } catch {
        if (temporary.has(questionKey)) return;
        temporary.add(questionKey);
    }
    window.dispatchEvent(new Event(changed));
}

function subscribe(notify: () => void) {
    function onStorage(event: StorageEvent) {
        if (event.key === null || event.key.startsWith(prefix)) notify();
    }
    window.addEventListener(changed, notify);
    window.addEventListener('storage', onStorage);
    return () => {
        window.removeEventListener(changed, notify);
        window.removeEventListener('storage', onStorage);
    };
}

export function useQuestionProgress(keys: readonly string[]) {
    return useSyncExternalStore(
        subscribe,
        () => {
            try {
                return keys.map((key) => window.localStorage.getItem(prefix + key) === '1' || temporary.has(key) ? '1' : '0').join('');
            } catch {
                return keys.map((key) => temporary.has(key) ? '1' : '0').join('');
            }
        },
        () => '0'.repeat(keys.length),
    );
}
