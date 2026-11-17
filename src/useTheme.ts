import { useLayoutEffect, useState } from 'react';
import { dark, light, type ThemeName } from './theme';

const STORAGE_KEY = 'mini-market-theme';

function initialTheme(): ThemeName {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [name, setName] = useState<ThemeName>(initialTheme);

  useLayoutEffect(() => {
    localStorage.setItem(STORAGE_KEY, name);
    document.documentElement.dataset.theme = name;
  }, [name]);

  const toggle = () => setName((current) => (current === 'dark' ? 'light' : 'dark'));

  return { name, theme: name === 'dark' ? dark : light, toggle };
}
