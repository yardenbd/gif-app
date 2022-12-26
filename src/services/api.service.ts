import { IGif, IMappedGif, IResponseData } from "../types";

export const getGifs = async (value: string) => {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_SECRET_API_KEY}=${value}&limit=25&offset=0&rating=g&lang=en`;
  const response = await fetch(URL);
  const parsedResponse = (await response.json()) as IResponseData;

  saveSearchQueryToLocalStorage(value);
  return parsedResponse.data;
};

export const saveSearchQueryToLocalStorage = (value: string) => {
  const allSavedQueris = localStorage.getItem("quries");
  const t = allSavedQueris && JSON.parse(allSavedQueris);
  localStorage.setItem("quries", JSON.stringify([...(t || []), value]));
};
