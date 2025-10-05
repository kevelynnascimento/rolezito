// src/constants/theme.ts
import { MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavDefaultTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';

const baseColors = {
  primary: '#A78BFA',       // roxo pastel
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#1E1E1E',
};

export const lightPaperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...baseColors,
  },
};

export const lightNavTheme = {
  ...NavDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    ...baseColors,
  },
};

// opcional: você pode adicionar versão escura no futuro se quiser
export const darkNavTheme = NavDarkTheme;
