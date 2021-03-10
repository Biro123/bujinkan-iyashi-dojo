// import { lightTheme, darkTheme } from './soothing';
import { lightTheme, darkTheme } from './iyashi';

const themes = [ lightTheme, darkTheme ];

export function getThemeByName(themeName) {
  return themes.find((theme) => theme.palette.type === themeName);
}
