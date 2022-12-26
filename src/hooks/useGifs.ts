import { useEffect, useState } from "react";
import {
  getGifs,
  saveSearchQueryToLocalStorage,
} from "../services/api.service";
import { IGif, IMappedGif } from "../types";
export const useGifs = () => {
  const localStorageGifs = localStorage.getItem("gifs");
  const [gifs, setGifs] = useState<IGif[]>([]);

  const getGifByQuery = async (value: string) => {
    const allGifs = await getGifs(value);
    saveSearchQueryToLocalStorage(value);
    if (localStorageGifs) {
      const gifsToSave = [...JSON.parse(localStorageGifs), ...allGifs];
      console.log("gifsToSave", gifsToSave);
      setGifs(gifsToSave);
      localStorage.setItem("gifs", JSON.stringify(gifsToSave));
    } else {
      setGifs(allGifs);
      localStorage.setItem("gifs", JSON.stringify(allGifs));
    }
  };

  useEffect(() => {
    if (localStorageGifs) setGifs(JSON.parse(localStorageGifs));
  }, [localStorageGifs]);

  return { getGifByQuery, gifs };
};
