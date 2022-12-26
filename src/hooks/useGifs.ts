import { useEffect, useState } from "react";
import {
  getGifs,
  saveSearchQueryToLocalStorage,
} from "../services/api.service";
import { IGif } from "../types";
export const useGifs = () => {
  const localStorageGifs = localStorage.getItem("gifs");
  const prevoiusQuries = localStorage.getItem("quries");
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [error, setError] = useState<boolean>(false);

  const getGifByQuery = async (query: string) => {
    const allGifs = await getGifs(query, setError);
    saveSearchQueryToLocalStorage(query);
    setGifs(allGifs);
    localStorage.setItem("gifs", JSON.stringify(allGifs));
  };

  useEffect(() => {
    if (localStorageGifs) setGifs(JSON.parse(localStorageGifs));
  }, [localStorageGifs]);

  return {
    getGifByQuery,
    gifs,
    error,
    prevoiusQuries: prevoiusQuries
      ? (JSON.parse(prevoiusQuries) as string[])
      : [],
  };
};
