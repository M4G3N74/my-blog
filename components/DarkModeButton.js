import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-label="Appearance mode toggle button"
      type=""
      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800  dark:hover:bg-gray-700 transition-all rounded flex items-center justify-center h-7 w-7">
    </button>
  );
}