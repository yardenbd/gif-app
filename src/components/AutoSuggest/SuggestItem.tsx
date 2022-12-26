import React from "react";
import { IMappedGif } from "../../types";
import { StyledSuggestItem } from "./style";

interface ISuggestItemProps {
  gif: IMappedGif;
}
export const SuggestItem: React.FC<ISuggestItemProps> = ({ gif }) => {
  const { id, name, url } = gif;
  return (
    <StyledSuggestItem>
      <span>Id : {id}</span>
      <span>Name : {name}</span>
      <span>Url : {url}</span>
    </StyledSuggestItem>
  );
};
