import { useEffect, useState } from "react";
import {
  getGifs,
  saveSearchQueryToLocalStorage,
} from "../services/api.service";
import { IGif, PaginationRequestType } from "../types";
export const useGifs = () => {
  const localStorageGifs = localStorage.getItem("gifs");
  const prevoiusQuries = localStorage.getItem("quries");
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [error, setError] = useState<boolean>(false);

  const getGifByQuery = async (
    query: string,
    pagination: PaginationRequestType
  ) => {
    const allGifs = await getGifs(query, setError, pagination);
    saveSearchQueryToLocalStorage(query);
    setGifs(allGifs);
    localStorage.setItem("gifs", JSON.stringify(allGifs));
  };

  const latestQuery: string =
    (prevoiusQuries &&
      JSON.parse(prevoiusQuries)[JSON.parse(prevoiusQuries).length - 1]) ||
    "";

  useEffect(() => {
    if (localStorageGifs) setGifs(JSON.parse(localStorageGifs));
  }, [localStorageGifs]);

  return {
    getGifByQuery,
    gifs,
    latestQuery,
    error,
    prevoiusQuries: prevoiusQuries
      ? (JSON.parse(prevoiusQuries) as string[])
      : [],
  };
};
