import axios from "axios";


axios.defaults.headers.post["Content-Type"] = "application/json";


const mainAxios =new axios.create({
  baseURL: 'http://localhost:8000',
});


export default mainAxios;
