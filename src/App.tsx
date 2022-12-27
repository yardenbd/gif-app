import { useState } from "react";
import { AutoSuggest } from "./components/AutoSuggest/AutoSuggest";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { Pagination } from "./components/Pagintaion/Pagination";
import { useGifs } from "./hooks/useGifs";
import { StyledForm, InputWrapper, AppWrapper } from "./style";

function App() {
  const [query, setQuery] = useState<string>("");
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

  const displaySearchReusltCondition =
    shouldDispayHistorySearchResult && query && isQueryInPrevoiusQuries;
  const renderAutosuggest = displaySearchReusltCondition && (
    <AutoSuggest setQuery={setQuery} queris={isQueryInPrevoiusQuries} />
  );
  const renderPagination = gifs.length > 0 && (
    <Pagination
      onPageClick={({ offset, count }) =>
        getGifByQuery(query || latestQuery, { count, offset })
      }
    />
  );
  return (
    <AppWrapper>
      <StyledForm onSubmit={handleSubmit}>
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
      </StyledForm>
      <GifsDisplay gifs={gifs} />
      {renderPagination}
    </AppWrapper>
  );
}

export default App;
