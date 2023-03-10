import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useGifs } from "../../hooks/useGifs";
import { InputWrapper, RowContainer, StyledForm } from "./style";
import { AutoSuggest } from "../AutoSuggest/AutoSuggest";
import { FilterComponent } from "../FilterComponent/FilterComponent";
import { FilterObject } from "../../types";

interface IFormProps {
  handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleFilterBy: React.Dispatch<React.SetStateAction<FilterObject>>;
  query: string;
  filterBy: Partial<FilterObject> | null;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export const Form: React.FC<IFormProps> = ({
  handleSubmit,
  handleFilterBy,
  query,
  setQuery,
  filterBy,
}) => {
  const [shouldDispayHistorySearchResult, setShouldDispayHistorySearchResult] =
    useState<boolean>(false);

  const { prevoiusQuries } = useGifs();

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const filteredPreviousQuries = prevoiusQuries.filter((value) =>
    value.toLowerCase().includes(query.toLowerCase())
  );

  const renderAutosuggest = shouldDispayHistorySearchResult && (
    <AutoSuggest setQuery={setQuery} queris={filteredPreviousQuries} />
  );

  const isClickedOutside = useClickOutside(inputWrapperRef);

  useEffect(() => {
    if (isClickedOutside) setShouldDispayHistorySearchResult(false);
  }, [isClickedOutside]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <RowContainer>
        <InputWrapper ref={inputWrapperRef}>
          <input
            id="input"
            type={"text"}
            value={query}
            onFocus={() => setShouldDispayHistorySearchResult(true)}
            onChange={(ev) => setQuery(ev.target.value)}
          />
          {renderAutosuggest}
        </InputWrapper>

        <input type={"submit"} value="Submit" />
      </RowContainer>
      <FilterComponent filterBy={filterBy} handleFilterBy={handleFilterBy} />
    </StyledForm>
  );
};
