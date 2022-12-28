import { useState } from "react";
import {
  getGifs,
  saveSearchQueryToLocalStorage,
} from "../services/api.service";
import { IGif, PaginationRequestType } from "../types";
export const useGifs = () => {
  const localStorageGifs = localStorage.getItem("gifs");

  const prevoiusQuries = localStorage.getItem("quries");

  const [gifs, setGifs] = useState<{ gifs: IGif[]; totalGifs: number }>(
    (localStorageGifs && JSON.parse(localStorageGifs)) || {
      gifs: [],
      totalGifs: 0,
    }
  );

  const [error, setError] = useState<boolean>(false);

  const getGifByQuery = async (
    query: string,
    pagination: PaginationRequestType
  ) => {
    const result = await getGifs(query, setError, pagination);
    saveSearchQueryToLocalStorage(query);
    setGifs(result);
    localStorage.setItem("gifs", JSON.stringify(result));
    return result.totalGifs;
  };

  const latestQuery: string =
    (prevoiusQuries &&
      JSON.parse(prevoiusQuries)[JSON.parse(prevoiusQuries).length - 1]) ||
    "";

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
