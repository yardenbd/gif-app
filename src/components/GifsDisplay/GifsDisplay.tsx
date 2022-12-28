import React from "react";
import { Direction, IGif } from "../../types";
import { StyledGifsLayout } from "./style";

interface IGifsDisplayProps {
  gifs: IGif[];
  direction: Direction;
}
export const GifsDisplay: React.FC<IGifsDisplayProps> = ({
  gifs,
  direction,
}) => {
  const gifsToRender = gifs.map((gif) => (
    <img src={gif.images.original.url} key={gif.id} alt="gif" />
  ));
  return (
    <StyledGifsLayout direction={direction} id="gifs">
      {gifsToRender}
    </StyledGifsLayout>
  );
};
