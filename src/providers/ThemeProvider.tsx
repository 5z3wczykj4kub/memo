import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

const DARK_THEME_CLASS_NAME = 'dark-theme';

const defaultValue = {
  isDarkThemeUsed: document.body.classList.contains(DARK_THEME_CLASS_NAME),
  toggleDarkTheme: () => document.body.classList.toggle(DARK_THEME_CLASS_NAME),
};

const ThemeContext = createContext(defaultValue);

const ThemeProvider = ({ children }: { children?: ReactElement }) => {
  const themeContext = useContext(ThemeContext);

  const [isDarkThemeUsed, setIsDarkThemeUsed] = useState(
    themeContext.isDarkThemeUsed
  );

  /**
   * FIXME:
   * Component mounting makes flashing effect.
   */
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add(DARK_THEME_CLASS_NAME);
      setIsDarkThemeUsed(true);
    }
  }, []);

  const toggleDarkTheme = () => {
    const isDarkThemeUsed = themeContext.toggleDarkTheme();
    setIsDarkThemeUsed(isDarkThemeUsed);
    return isDarkThemeUsed;
  };

  return (
    <ThemeContext.Provider value={{ isDarkThemeUsed, toggleDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };

export default ThemeProvider;
