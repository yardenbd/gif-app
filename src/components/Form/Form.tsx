import React, { useState } from "react";
import { useGifs } from "../../hooks/useGifs";
import { InputWrapper, RowContainer, StyledForm } from "../../style";
import { AutoSuggest } from "../AutoSuggest/AutoSuggest";
import { FilterComponent } from "../FilterComponent/FilterComponent";

interface IFormProps {
  handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleFilterBy: (criteria: string, value: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export const Form: React.FC<IFormProps> = ({
  handleSubmit,
  handleFilterBy,
  query,
  setQuery,
}) => {
  const [shouldDispayHistorySearchResult, setShouldDispayHistorySearchResult] =
    useState<boolean>(false);

  const { prevoiusQuries } = useGifs();

  const isQueryInPrevoiusQuries = prevoiusQuries.filter((value) =>
    value.toLowerCase().includes(query.toLowerCase())
  );

  const displaySearchReusltCondition =
    shouldDispayHistorySearchResult && query && isQueryInPrevoiusQuries;

  const renderAutosuggest = displaySearchReusltCondition && (
    <AutoSuggest setQuery={setQuery} queris={isQueryInPrevoiusQuries} />
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <RowContainer>
        <InputWrapper>
          <input
            type={"text"}
            value={query}
            onFocus={() => setShouldDispayHistorySearchResult(true)}
            onChange={(ev) => setQuery(ev.target.value)}
          />
          {renderAutosuggest}
        </InputWrapper>

        <input type={"submit"} value="Submit" />
      </RowContainer>
      <FilterComponent handleFilterBy={handleFilterBy} />
    </StyledForm>
  );
};
