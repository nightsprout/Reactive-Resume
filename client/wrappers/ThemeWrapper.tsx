import { ThemeProvider } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { darkTheme, lightTheme } from '@/config/theme';
import { setTheme } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const ThemeWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.build.theme);

  const isDarkMode = useMemo(() => theme === 'dark', [theme]);

  const muiTheme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  useEffect(() => {
    if (theme === undefined) {
      dispatch(setTheme({ theme: 'dark' }));
    }
  }, [theme, dispatch]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, [isDarkMode]);

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
