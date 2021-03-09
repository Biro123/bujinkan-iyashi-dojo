import { createState, useState } from '@hookstate/core';

const startTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
const themeState = createState(startTheme);

export function useThemeState() {
    const state = useState(themeState)

    return ({
        setTheme(theme) {
          localStorage.setItem('theme', theme);
          state.set(theme);
        },
        get() {
          return state.get()
        },
        toggle() {
          state.set((p) => {
            const newTheme = (p==='light' ? 'dark' : 'light');
            localStorage.setItem('theme', newTheme);
            return newTheme;
          } )
        }
    })   
}