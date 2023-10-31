import axios from "axios";
import { BASE_URL_API } from "../utils";

export const movieApi = {
  searchMovie: (payload: any) => {
    return axios.post(`${BASE_URL_API}/movie/search`, payload);
  },
  getMovieById: (payload: any) => {
    return axios.post(`${BASE_URL_API}/movie/get`, payload);
  },
  searchGenre: (payload: any) => {
    return axios.post(`${BASE_URL_API}/genre/search`, payload);
  },
};
