import { useState } from "react";
import { AutoSuggest } from "./components/AutoSuggest/AutoSuggest";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { Pagination } from "./components/Pagintaion/Pagination";
import { useGifs } from "./hooks/useGifs";
import { StyledForm, InputWrapper, AppWrapper, RowContainer } from "./style";

function App() {
  const [query, setQuery] = useState<string>("");
  const [filterBy, setFilterBy] = useState({
    date: "01-01-1970",
  });
  const [shouldDispayHistorySearchResult, setShouldDispayHistorySearchResult] =
    useState<boolean>(false);

  const { getGifByQuery, gifs, prevoiusQuries, latestQuery } = useGifs();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    if (!query) return;
    ev.preventDefault();
    getGifByQuery(query, { count: 25, offset: 0 });
  };
  const isQueryInPrevoiusQuries = prevoiusQuries.filter((value) =>
    value.toLowerCase().includes(query.toLowerCase())
  );

  const handleFilterBy = (criteria: string, value: string) => {
    setFilterBy((prevfilters) => {
      return { ...prevfilters, [criteria]: value };
    });
  };

  const filteredGifs = gifs.filter((gif) => {
    const isLaterThanFilterDate =
      Date.parse(gif.import_datetime) > Date.parse(filterBy.date);
    if (isLaterThanFilterDate) return gif;
  });

  const displaySearchReusltCondition =
    shouldDispayHistorySearchResult && query && isQueryInPrevoiusQuries;
  const renderAutosuggest = displaySearchReusltCondition && (
    <AutoSuggest setQuery={setQuery} queris={isQueryInPrevoiusQuries} />
  );

  const renderPagination = filteredGifs.length > 0 && (
    <Pagination
      onPageClick={({ offset, count }) =>
        getGifByQuery(query || latestQuery, { count, offset })
      }
    />
  );
  return (
    <AppWrapper>
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
        <RowContainer>
          <span>Filter By : </span>
          <label htmlFor="date">date </label>
          <input
            onChange={(ev) =>
              handleFilterBy(
                "date",
                ev.target.value ? ev.target.value : "01-01-1970"
              )
            }
            id="date"
            type={"date"}
            min="1970-01-01"
          />
        </RowContainer>
      </StyledForm>
      <GifsDisplay gifs={filteredGifs} />
      {renderPagination}
    </AppWrapper>
  );
}

export default App;
