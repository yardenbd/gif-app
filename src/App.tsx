import { useCallback, useState } from "react";
import { Form } from "./components/Form/Form";
import { GifsDisplay } from "./components/GifsDisplay/GifsDisplay";
import { Pagination } from "./components/Pagintaion/Pagination";
import { useGifs } from "./hooks/useGifs";
import { AppWrapper } from "./components/Form/style";
import { DateFilter, Direction, FilterObject, IPaginationState } from "./types";

const App = (): JSX.Element => {
  const {
    getGifByQuery,
    gifs: { gifs, totalGifs },
    latestQuery,
    error,
  } = useGifs();

  const [filterBy, setFilterBy] = useState<FilterObject | null>(null);
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
    console.log("totalgifs", total);
    setPagination((prevState) => {
      return { ...prevState, pageIndex: 1, total };
    });
  };

  const handleFilterBy = useCallback((filterType: DateFilter, time: string) => {
    setFilterBy({ date: { from: filterType, time } });
  }, []);

  const filteredGifs = filterBy
    ? gifs.filter((gif) => {
        const isGreaterOperator = filterBy.date.from === "Later than";
        const isLaterThanFilterDate = isGreaterOperator
          ? Date.parse(gif.import_datetime) > Date.parse(filterBy.date.time)
          : Date.parse(gif.import_datetime) < Date.parse(filterBy.date.time);
        if (isLaterThanFilterDate) return gif;
        return null;
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
        handleFilterBy={handleFilterBy}
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
