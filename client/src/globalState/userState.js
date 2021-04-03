import { createState, useState } from '@hookstate/core';
import axios from 'axios';
import Userfront from '@userfront/react';
import jwt from 'jwt-decode';
import { useAlertState } from './alertState';

const userState = createState({
    isAuthenticated: null,
    loading: true,
    user: null    
})

export function useUserState() {
    const state = useState(userState)
    const alertState = useAlertState();
  
    return ({
        get isAuthenticated() {
          return state.isAuthenticated.get();
        },
       
        // @purpose   Sync state with local cookie on startup or full refresh
        async loadUser() {
          const config = {
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Userfront.accessToken()}`,
            }
          };
          
          try {
            const res = await axios.get('/api/users/me', config );
            state.roles.set(res.data.authorization[res.data.tenantId].roles);
            state.user.set(jwt(Userfront.idToken()));            
            state.isAuthenticated.set(true);
            state.isLoading.set(false);   
          } catch (err) {
            // console.log(err.response);
            state.user.set(null);
            state.isAuthenticated.set(false);
            state.isLoading.set(false);
          }
        },

        signOut() {
          Userfront.logout();
          state.isAuthenticated.set(false);
          state.isLoading.set(false);
          state.user.set(null);
        },

        get user() {
            return state.user.get()
        },

        get roles() {
          return state.roles.get()
        },

        get() {
            return state.get()
        },
        set(value) {
            state.set(value)
        }
    })   
}