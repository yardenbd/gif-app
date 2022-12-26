import { IGif, IMappedGif, IResponseData } from "../types";

export const getGifs = async (value: string) => {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_SECRET_API_KEY}=${value}&limit=25&offset=0&rating=g&lang=en`;
  const response = await fetch(URL);
  const parsedResponse = (await response.json()) as IResponseData;
  const mappedGifs: IMappedGif[] = parsedResponse.data.map((gif: IGif) => {
    return { url: gif.url, id: gif.id, name: gif.username };
  });
  return mappedGifs;
};
