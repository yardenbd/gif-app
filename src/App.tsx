import { useState } from "react";
import { Form } from "./components/Form/Form";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { Pagination } from "./components/Pagintaion/Pagination";
import { useGifs } from "./hooks/useGifs";
import { AppWrapper } from "./components/Form/style";
import { FilterObject, IPaginationState } from "./types";

const App = (): JSX.Element => {
  const {
    getGifByQuery,
    gifs: { gifs, totalGifs },
    latestQuery,
    error,
  } = useGifs();

  const [filterBy, setFilterBy] = useState<FilterObject>({
    date: "01-01-1970",
  });
  const [pagination, setPagination] = useState<IPaginationState>({
    count: 25,
    offset: 0,
    pageIndex: 1,
    total: totalGifs,
  });
  const [query, setQuery] = useState<string>("");

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    if (!query) return;
    ev.preventDefault();
    const totalGifs = await getGifByQuery(query, { count: 25, offset: 0 });
    setPagination((prevState) => {
      return { ...prevState, pageIndex: 1, total: totalGifs };
    });
  };

  const handleFilterBy = (value: string) => {
    setFilterBy({ date: value });
  };

  const filteredGifs = gifs.filter((gif) => {
    const isLaterThanFilterDate =
      Date.parse(gif.import_datetime) > Date.parse(filterBy.date);
    if (isLaterThanFilterDate) return gif;
    return null;
  });

  const renderPagination = !!filteredGifs.length && (
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
