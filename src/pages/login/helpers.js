import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

export const mainAxios = new axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
});

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    mainAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    //deleting the token from header
    delete mainAxios.defaults.headers.common["Authorization"];
  }
};

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  
  export const expireCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };


  export const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };