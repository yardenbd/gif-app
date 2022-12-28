import { useState } from "react";
import { Form } from "./components/Form/Form";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { Pagination } from "./components/Pagintaion/Pagination";
import { useGifs } from "./hooks/useGifs";
import { AppWrapper } from "./style";
import { FilterObject, PaginationRequestType } from "./types";

const initialState = {
  count: 25,
  offset: 0,
  pageIndex: 1,
};

const App = (): JSX.Element => {
  const [filterBy, setFilterBy] = useState<FilterObject>({
    date: "01-01-1970",
  });
  const [pagination, setPagination] = useState<
    PaginationRequestType & { pageIndex: number }
  >(initialState);
  const [query, setQuery] = useState<string>("");

  const { getGifByQuery, gifs, latestQuery, error } = useGifs();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    if (!query) return;
    ev.preventDefault();
    getGifByQuery(query, { count: 25, offset: 0 });
    setPagination((prevState) => {
      return { ...prevState, pageIndex: 1 };
    });
  };

  const handleFilterBy = (criteria: string, value: string) => {
    setFilterBy((prevfilters) => {
      return { ...prevfilters, [criteria]: value };
    });
  };

  const filteredGifs = gifs.filter((gif) => {
    const isLaterThanFilterDate =
      Date.parse(gif.import_datetime) > Date.parse(filterBy.date);
    if (isLaterThanFilterDate) return gif;
    return null;
  });

  const renderPagination = filteredGifs.length && (
    <Pagination
      pagination={pagination}
      setPagination={setPagination}
      onPageClick={({ offset, count }) =>
        getGifByQuery(query || latestQuery, { count, offset })
      }
    />
  );
  const renderErrorMessage = error && <h1>Could not fetch gifs</h1>;

  return (
    <AppWrapper>
      <Form
        handleSubmit={handleSubmit}
        setQuery={setQuery}
        query={query}
        handleFilterBy={handleFilterBy}
      />
      <GifsDisplay gifs={filteredGifs} />
      {renderErrorMessage}
      {renderPagination}
    </AppWrapper>
  );
};

export default App;
