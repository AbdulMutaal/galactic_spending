import { BaseURL } from "./config";
import axios from "axios";


export const fetchStarshipsCostByFilms = async () => {
    let { data } = await axios.get(`${BaseURL}/starshipCost`);

    return data;
};
