import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3333", react native barra requisões sem o HTTPS
  baseURL: "http://192.168.1.4:3333",
});

export default api;
