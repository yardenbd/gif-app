import { useState } from "react";
import { Form } from "./components/Form/Form";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { Pagination } from "./components/Pagintaion/Pagination";
import { useGifs } from "./hooks/useGifs";
import { AppWrapper } from "./components/Form/style";
import { Direction, FilterObject, IPaginationState } from "./types";
import { filterByDate, filterByRating } from "./helpers";

const App = (): JSX.Element => {
  const {
    getGifByQuery,
    gifs: { gifs, totalGifs },
    latestQuery,
    error,
  } = useGifs();

  const [filterBy, setFilterBy] = useState<FilterObject>({
    date: null,
    rating: null,
  });
  const [direction, setDirection] = useState<Direction>("row");

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
    const total = await getGifByQuery(query, { count: 25, offset: 0 });

    setPagination((prevState) => {
      return { ...prevState, pageIndex: 1, total };
    });
  };

  const filteredGifs = filterBy
    ? gifs.filter((gif) => {
        const date = filterByDate(gif, filterBy);
        const rating = filterByRating(gif, filterBy);
        if (date && rating) return gif;
        else return null;
      })
    : gifs;

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
        filterBy={filterBy}
        handleFilterBy={setFilterBy}
      />
      <button
        onClick={() => setDirection(direction === "row" ? "column" : "row")}
      >
        show {direction === "column" ? "row" : "column"}
      </button>
      <GifsDisplay direction={direction} gifs={filteredGifs} />
      {renderErrorMessage}
      {renderPagination}
    </AppWrapper>
  );
};

export default App;
