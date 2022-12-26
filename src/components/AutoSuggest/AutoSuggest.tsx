import React from "react";
import { IMappedGif } from "../../types";
import { StyledAutosuggest } from "./style";
import { SuggestItem } from "./SuggestItem";

interface IAutoSuggestProps {
  gifs: IMappedGif[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export const AutoSuggest: React.FC<IAutoSuggestProps> = ({
  gifs,
  setQuery,
}) => {
  const gifsToRender = gifs.map((gif, ind) => (
    <SuggestItem key={ind} gif={gif} />
  ));
  return <StyledAutosuggest>{gifsToRender}</StyledAutosuggest>;
};
