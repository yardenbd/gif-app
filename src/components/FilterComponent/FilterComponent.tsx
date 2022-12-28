import React, { useEffect, useRef, useState } from "react";
import { DateFilter, FilterObject, Rating } from "../../types";
import { RowContainer } from "../Form/style";

interface IFilterComponentProps {
  handleFilterBy: (filterType: Partial<FilterObject>) => void;
  filterBy: Partial<FilterObject> | null;
}

const RATING_ARRAY = ["Select", "pg-13", "g", "pg", "r", "y"];
const DATE_ARRAY = ["Select", "Earlier than", "Later than"];

export const FilterComponent: React.FC<IFilterComponentProps> = ({
  handleFilterBy,
  filterBy,
}) => {
  const [dateFilterType, setDateFilterType] = useState<DateFilter | null>(null);
  const [ratingFilter, setRatingFilter] = useState<Rating | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const renderDatePicker = dateFilterType && (
    <RowContainer>
      <label htmlFor="date">{dateFilterType}</label>
      <input
        ref={inputRef}
        onChange={(ev) =>
          handleFilterBy({
            date: { from: dateFilterType, time: ev.currentTarget.value },
          })
        }
        id="date"
        type={"date"}
        min="1970-01-01"
      />
    </RowContainer>
  );

  const renderRatingSelect = (
    <select
      onChange={(ev) =>
        setRatingFilter(
          ev.currentTarget.value === "Select"
            ? null
            : (ev.currentTarget.value as Rating)
        )
      }
    >
      {RATING_ARRAY.map((rating) => (
        <option key={rating}>{rating}</option>
      ))}
    </select>
  );

  const renderDateSelect = (
    <select
      onChange={(ev) =>
        setDateFilterType(
          ev.currentTarget.value === "Select"
            ? null
            : (ev.currentTarget.value as DateFilter)
        )
      }
    >
      {DATE_ARRAY.map((date) => (
        <option key={date}>{date}</option>
      ))}
    </select>
  );

  useEffect(() => {
    if (!dateFilterType || !inputRef.current?.value) return;
    handleFilterBy({
      date: {
        from: dateFilterType,
        time: inputRef.current.value,
      },
    });
  }, [dateFilterType, inputRef.current?.value, handleFilterBy]);

  useEffect(() => {
    if (!ratingFilter) return;
    handleFilterBy({
      rating: ratingFilter,
    });
  }, [ratingFilter, handleFilterBy]);

  useEffect(() => {
    if (!filterBy) {
      setDateFilterType(null);
      setRatingFilter(null);
    }
  }, [filterBy]);

  return (
    <RowContainer className="filter">
      <RowContainer>
        <span>Date filter </span>
        {renderDateSelect}
      </RowContainer>
      {renderDatePicker}
      <RowContainer>
        <span>Rating filter </span>
        {renderRatingSelect}
      </RowContainer>
    </RowContainer>
  );
};
