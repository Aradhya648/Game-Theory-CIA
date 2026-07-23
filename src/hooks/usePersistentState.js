import { useEffect, useState } from 'react';

const PREFIX = 'cia-1a2-game:';

export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(PREFIX + key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // localStorage unavailable — edits just won't persist across reloads.
    }
  }, [key, value]);

  return [value, setValue];
}
