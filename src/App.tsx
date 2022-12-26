import { useState } from "react";
import { AutoSuggest } from "./components/AutoSuggest/AutoSuggest";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { useGifs } from "./hooks/useGifs";
import { StyledForm, InputWrapper } from "./style";

function App() {
  const [query, setQuery] = useState<string>("");
  const { getGifByQuery, gifs, error, prevoiusQuries } = useGifs();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    if (!query) return;
    ev.preventDefault();
    setQuery("");
    getGifByQuery(query);
  };
  const isQueryInPrevoiusQuries = prevoiusQuries.filter((value) =>
    value.toLowerCase().includes(query.toLowerCase())
  );
  const renderAutosuggest = query && isQueryInPrevoiusQuries && (
    <AutoSuggest setQuery={setQuery} queris={isQueryInPrevoiusQuries} />
  );
  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <InputWrapper>
          <input
            type={"text"}
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
          />
          {renderAutosuggest}
        </InputWrapper>
        <input type={"submit"} value="Submit" />
      </StyledForm>
      <GifsDisplay gifs={gifs} />
    </div>
  );
}

export default App;
