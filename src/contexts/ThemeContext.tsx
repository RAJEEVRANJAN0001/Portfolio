import React, { createContext, useContext, useState, useEffect, startTransition } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    startTransition(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      } else {
        // Default to dark theme if no preference is saved
        setIsDark(true);
        localStorage.setItem('theme', 'dark');
      }
      setIsLoading(false);
    });
  }, []);

  const toggleTheme = () => {
    startTransition(() => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      if (mounted) {
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      }
    });
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ isDark: true, toggleTheme: () => {}, isLoading: true }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};
