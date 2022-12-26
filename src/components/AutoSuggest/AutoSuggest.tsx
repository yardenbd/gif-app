import React from "react";
import { IMappedGif } from "../../types";
import { StyledAutosuggest } from "./style";
import { SuggestItem } from "./SuggestItem";

interface IAutoSuggestProps {
  gifs: IMappedGif[];
}
export const AutoSuggest: React.FC<IAutoSuggestProps> = ({ gifs }) => {
  const gifsToRender = gifs.map((gif, ind) => (
    <SuggestItem key={ind} gif={gif} />
  ));
  return <StyledAutosuggest>{gifsToRender}</StyledAutosuggest>;
};
