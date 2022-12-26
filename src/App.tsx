import { useState } from "react";
import { AutoSuggest } from "./components/AutoSuggest/AutoSuggest";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { useGifs } from "./hooks/useGifs";
import { saveSearchQueryToLocalStorage } from "./services/api.service";
import { fetchGif } from "./state/actions/gifs.action";
import { useAppDispatch } from "./state/store";
import { StyledForm, InputWrapper } from "./style";

function App() {
  const [query, setQuery] = useState<string>("");
  const { getGifByQuery, gifs } = useGifs();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setQuery("");
    getGifByQuery(query);
  };
  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <InputWrapper>
          <input type={"text"} onChange={(ev) => setQuery(ev.target.value)} />
          {/* {renderAutosuggest} */}
        </InputWrapper>
        <input type={"submit"} value="Submit" />
      </StyledForm>
      <GifsDisplay gifs={gifs} />
    </div>
  );
}

export default App;
