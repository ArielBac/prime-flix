import axios from "axios";

// Base URL = https://api.themoviedb.org/3/
// Key = b86bd0de408f7438505826d8cd953596
// API URL = https://api.themoviedb.org/3/movie/now_playing?api_key=b86bd0de408f7438505826d8cd953596

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default api;