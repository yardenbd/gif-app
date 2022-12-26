import React from "react";
import { StyledSuggestItem } from "./style";

interface ISuggestItemProps {
  children?: React.ReactNode;
  onSelect: () => void;
}
export const SuggestItem: React.FC<ISuggestItemProps> = ({
  children,
  onSelect,
}) => {
  return (
    <StyledSuggestItem onClick={onSelect}>
      <span>{children}</span>
    </StyledSuggestItem>
  );
};
