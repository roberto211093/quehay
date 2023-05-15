import React, {useMemo, useState} from 'react';
import {StatusBar} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';


const App = () => {
  const [theme, setTheme] = useState('dark');
  DefaultThemePaper.colors.primary = '#dfbe24';
  DarkThemePaper.colors.primary = '#dfbe24';
  DarkThemePaper.colors.accent = '#dfbe24';

  DarkThemeNavigation.colors.background = '#5f150e';
  DarkThemeNavigation.colors.card = '#4d110b';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const preference = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <>
      <PreferencesContext.Provider value={preference}>
        <PaperProvider
          theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
          <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={theme === 'dark' ? '#4d110b' : '#FFF'}
          />
          <NavigationContainer
            theme={
              theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation
            }>
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </>
  );
};

export default App;
