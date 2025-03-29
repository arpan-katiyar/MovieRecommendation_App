import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTgxZjI5NjA1YjNiYTA3YWRiYTM5OTlmMGZlYjhiNSIsIm5iZiI6MTc0MDI5MzQwNS43NDIsInN1YiI6IjY3YmFjNTFkOWIwNjIzZTNiMWJlY2RkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xr-l8mFcnRCzSiiZTxYfBLm_M4IBwdWNg3Su5oapqgw",
  },
});
export default instance;
