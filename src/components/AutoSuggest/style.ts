import styled from "styled-components";

export const StyledAutosuggest = styled.div`
  width: 100%;
  max-height: 300px;
  position: absolute;
  overflow-y: scroll;
  top: calc(100% + 10px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const StyledSuggestItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  :hover {
    outline: 1px solid black;
  }
`;
