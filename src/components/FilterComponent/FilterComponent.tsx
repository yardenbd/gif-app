import React from "react";
import { RowContainer } from "../../style";

interface IFilterComponentProps {
  handleFilterBy: (filterType: string, query: string) => void;
}
export const FilterComponent: React.FC<IFilterComponentProps> = ({
  handleFilterBy,
}) => {
  return (
    <RowContainer>
      <span>Filter : </span>
      <label htmlFor="date">Later than</label>
      <input
        onChange={(ev) =>
          handleFilterBy(
            "date",
            ev.target.value ? ev.target.value : "01-01-1970"
          )
        }
        id="date"
        type={"date"}
        min="1970-01-01"
      />
    </RowContainer>
  );
};
