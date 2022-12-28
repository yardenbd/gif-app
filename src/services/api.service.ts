import { IResponseData, PaginationRequestType } from "../types";

export const getGifs = async (
  value: string,
  errorCallback: React.Dispatch<React.SetStateAction<boolean>>,
  pagination: PaginationRequestType
) => {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_SECRET_API_KEY}&q=${value}&limit=${pagination.count}&offset=${pagination.offset}&rating=g&lang=en`;
  const response = await fetch(URL);
  if (!response.ok) {
    errorCallback(!response.ok);
    return { gifs: [], totalGifs: 0 };
  }
  const parsedResponse = (await response.json()) as IResponseData;
  saveSearchQueryToLocalStorage(value);
  return {
    gifs: parsedResponse.data,
    totalGifs: parsedResponse.pagination.total_count,
  };
};

export const saveSearchQueryToLocalStorage = (query: string) => {
  const savedQuries = localStorage.getItem("quries");
  const quries = savedQuries && (JSON.parse(savedQuries) as string[]);
  if (!quries) {
    localStorage.setItem("quries", JSON.stringify([query]));
    return;
  }
  if (quries.indexOf(query) > -1) return;
  localStorage.setItem("quries", JSON.stringify([...(quries || []), query]));
};
