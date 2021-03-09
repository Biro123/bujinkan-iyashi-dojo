import { createState, useState } from '@hookstate/core';

const sidebarState = createState(false);

export function useSidebarState() {
    const state = useState(sidebarState)

    return ({
        setOpen() {
          state.set(true);
        },
        setClosed() {
          state.set(false);
        },
        get() {
          return state.get()
        },
        toggle() {
          state.set((p) => !p)
        }
    })   
}