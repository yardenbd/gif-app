import { useState } from "react";
import { AutoSuggest } from "./components/AutoSuggest/AutoSuggest";
import { useGifs } from "./hooks/useGifs";
import { StyledForm, InputWrapper } from "./style";

function App() {
  const [query, setQuery] = useState<string>("");
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  };
  const gifs = useGifs(query);
  const renderAutosuggest = query && <AutoSuggest gifs={gifs} />;
  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <InputWrapper>
          <input type={"text"} onChange={(ev) => setQuery(ev.target.value)} />
          {renderAutosuggest}
        </InputWrapper>
        <input type={"submit"} value="Submit" />
      </StyledForm>
    </div>
  );
}

export default App;
