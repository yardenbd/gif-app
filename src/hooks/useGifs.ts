import { useEffect, useState } from "react";
import { getGifs } from "../services/api.service";
import { IMappedGif } from "../types";
export const useGifs = (value: string): IMappedGif[] => {
  const localStorageGifs = localStorage.getItem("gifs");
  const [gifs, setGifs] = useState<IMappedGif[]>([]);

  useEffect(() => {
    getGifs(value).then((mappedGifs) => {
      setGifs(mappedGifs);
      localStorage.setItem("gifs", JSON.stringify(mappedGifs));
    });
  }, [value]);
  return gifs;
};
