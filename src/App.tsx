import { useState } from "react";
import { Form } from "./components/Form/Form";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { Pagination } from "./components/Pagintaion/Pagination";
import { useGifs } from "./hooks/useGifs";
import { AppWrapper } from "./style";
import { PaginationRequestType } from "./types";

const initialState = {
  count: 25,
  offset: 0,
  pageIndex: 1,
};

function App() {
  const [filterBy, setFilterBy] = useState({
    date: "01-01-1970",
  });
  const [pagination, setPagination] = useState<
    PaginationRequestType & { pageIndex: number }
  >(initialState);
  const [query, setQuery] = useState<string>("");
  const { getGifByQuery, gifs, latestQuery } = useGifs();

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

  const renderPagination = filteredGifs.length > 0 && (
    <Pagination
      pagination={pagination}
      setPagination={setPagination}
      onPageClick={({ offset, count }) =>
        getGifByQuery(query || latestQuery, { count, offset })
      }
    />
  );
  return (
    <AppWrapper>
      <Form
        handleSubmit={handleSubmit}
        setQuery={setQuery}
        query={query}
        handleFilterBy={handleFilterBy}
      />
      <GifsDisplay gifs={filteredGifs} />
      {renderPagination}
    </AppWrapper>
  );
}

export default App;
