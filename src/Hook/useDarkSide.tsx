import { useEffect, useState } from 'react';

export default function useDarkSide() {
  const [darkSide, setDarkSide] = useState(false);
  
  useEffect(() => {
    const colorTheme = darkSide ? 'dark' : 'light';
    const root = window.document.documentElement;
    root.classList.remove(colorTheme === 'dark' ? 'light' : 'dark');
    root.classList.add(colorTheme);
    
    localStorage.setItem('theme', colorTheme);
  }, [darkSide]);

  const toggleTheme = () => {
    setDarkSide(prevDarkSide => !prevDarkSide);
  };

  return [darkSide, toggleTheme];
}
