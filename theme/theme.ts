import { DarkTheme as NavDark, DefaultTheme as NavLight } from '@react-navigation/native';

export const LightTheme = {
  ...NavLight,
  colors: {
    ...NavLight.colors,
    background: '#fff',
    text: '#000'
  }
};

export const DarkTheme = {
  ...NavDark,
  colors: {
    ...NavDark.colors,
    background: '#000',
    text: '#fff'
  }
};