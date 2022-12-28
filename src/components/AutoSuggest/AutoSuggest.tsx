import React from "react";
import { StyledAutosuggest } from "./style";
import { SuggestItem } from "./SuggestItem";

interface IAutoSuggestProps {
  queris: string[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export const AutoSuggest: React.FC<IAutoSuggestProps> = ({
  queris,
  setQuery,
}) => {
  const querisToRender = queris.map((query) => (
    <SuggestItem onSelect={() => setQuery(query)} key={query}>
      {query}
    </SuggestItem>
  ));
  return <StyledAutosuggest>{querisToRender}</StyledAutosuggest>;
};
