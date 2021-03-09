import { createState, useState } from '@hookstate/core';
import { v4 as uuid } from 'uuid';

const alertState = createState([]);

export function useAlertState() {
    const state = useState(alertState)

    return ({
        setAlert(msg, alertType, timeout = 5000) {
          // alertType must be error, warning, info, success
          const id = uuid()
          state.merge([{ msg, alertType, id }]);
          setTimeout(() => state.set(
            currState => currState.filter((alert) => alert.id !== id)
          ), timeout);
        },
        get() {
          return state.get()
        }
    })   
}