import React from "react";
import { IGif } from "../../types";
import { StyledGifsLayout } from "./style";

interface IGifsDisplayProps {
  gifs: IGif[];
}
export const GifsDisplay: React.FC<IGifsDisplayProps> = ({ gifs }) => {
  const gifsToRender = gifs.map((gif) => (
    <img src={gif.images.original.url} key={gif.id} alt="gif" />
  ));
  return <StyledGifsLayout>{gifsToRender}</StyledGifsLayout>;
};
