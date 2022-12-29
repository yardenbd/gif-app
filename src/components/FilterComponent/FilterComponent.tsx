import React from "react";
import { DateFilter, FilterObject, Rating } from "../../types";
import { RowContainer } from "../Form/style";

interface IFilterComponentProps {
  handleFilterBy: React.Dispatch<React.SetStateAction<FilterObject>>;
  filterBy: Partial<FilterObject> | null;
}

const RATING_ARRAY = ["Select", "pg-13", "g", "pg", "r", "y"];
const DATE_ARRAY = ["Select", "Earlier than", "Later than"];

export const FilterComponent: React.FC<IFilterComponentProps> = ({
  handleFilterBy,
  filterBy,
}) => {
  const renderDatePicker = filterBy?.date?.from && (
    <RowContainer>
      <label htmlFor="date">{filterBy?.date?.from}</label>
      <input
        onChange={(ev) =>
          handleFilterBy((prevFilters) => {
            return {
              ...prevFilters,
              date: {
                from: prevFilters.date?.from || null,
                time: ev.target.value,
              },
            };
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
        handleFilterBy((prevFilters) => {
          return {
            ...prevFilters,
            rating: ev.currentTarget.value
              ? (ev.currentTarget.value as Rating)
              : null,
          };
        })
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
        handleFilterBy((prevFilters) => {
          return {
            ...prevFilters,
            date: {
              from: ev.currentTarget.value as DateFilter,
              time: prevFilters.date?.time || "",
            },
          };
        })
      }
    >
      {DATE_ARRAY.map((date) => (
        <option key={date}>{date}</option>
      ))}
    </select>
  );

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
