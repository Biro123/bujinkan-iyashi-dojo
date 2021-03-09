import { lightTheme, darkTheme } from './soothing';

const themes = [ lightTheme, darkTheme ];

export function getThemeByName(themeName) {
  return themes.find((theme) => theme.palette.type === themeName);
}
