import axios from "axios";
import { data } from "./data";

const NEWS_API_ENDPOINT = `https://gnews.io/api/v4/search?q=crypto OR blockchain OR ai&lang=en&country=us&max=10&apikey={
  import.meta.env.VITE_NEWS_API_KEY
}`;

export const getNews = async () => {
  let response;
  try {
    response = await axios.get(NEWS_API_ENDPOINT);
    response = response.data.articles.slice(0, 15);
  } catch (error) {
    return error;
  }
  return response;
};

export const getCrypto = async () => {
  let response;
  //   try {
  // response = await axios.get(
  //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
  // );
  //     console.log(response);
  //     response = response.data;
  //   } catch (error) {
  //     return error;
  //   }
  console.log(data);
  return data;
};
