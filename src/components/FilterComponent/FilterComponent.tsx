import React, { useEffect, useRef, useState } from "react";
import { DateFilter } from "../../types";
import { RowContainer } from "../Form/style";

interface IFilterComponentProps {
  handleFilterBy: (filterType: DateFilter, query: string) => void;
}

export const FilterComponent: React.FC<IFilterComponentProps> = ({
  handleFilterBy,
}) => {
  const [filterType, setFilterType] = useState<DateFilter | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const renderDatePicker = filterType && (
    <>
      <label htmlFor="date">{filterType}</label>
      <input
        ref={inputRef}
        onChange={(ev) =>
          handleFilterBy(
            filterType,
            ev.target.value ? ev.target.value : "01-01-1970"
          )
        }
        id="date"
        type={"date"}
        min="1970-01-01"
      />
    </>
  );

  useEffect(() => {
    if (!filterType || !inputRef.current?.value) return;
    handleFilterBy(filterType, inputRef.current?.value || "");
  }, [filterType, inputRef.current?.value, handleFilterBy]);

  return (
    <RowContainer>
      <span>Date filter </span>
      <select
        onChange={(ev) =>
          setFilterType(
            ev.currentTarget.value === "Select"
              ? null
              : (ev.currentTarget.value as DateFilter)
          )
        }
      >
        <option>Select</option>
        <option>Later than</option>
        <option>Earlier than</option>
      </select>
      {renderDatePicker}
    </RowContainer>
  );
};
