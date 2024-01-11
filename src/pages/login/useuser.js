import {create} from "zustand";
import  {mainAxios, setAuthToken,expireCookie, setCookie} from './helpers'
import axios from "axios";
export const useUser = create((set) => ({
    user: null,
    logout: () => {
      set({ user: null });
      expireCookie("access_token");
    },
  
    login: async ({ username, password }) => {
  
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      };
  
  
      try {
        const response = await axios.post('/api/v1/login', params.toString(), options);
        const { access_token, token_type, ...user } = response?.data;
        
        if (response.status === 200) {
          set({ user });
          setAuthToken(access_token);
          setCookie("access_token", access_token);
          // setCookie("refresh_token", refresh_token);
          localStorage.setItem('User', JSON.stringify({user}));
          return true;
        }
        return false;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  }));