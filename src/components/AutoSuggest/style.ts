import styled from "styled-components";

export const StyledAutosuggest = styled.ul`
  width: 100%;
  max-height: 300px;
  position: absolute;
  z-index: 10;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background: white;
  margin: 0;
  padding: 0;
`;

export const StyledSuggestItem = styled.li`
  width: 100%;
  list-style: none;
  :hover {
    background: lightgray;
  }
  padding-left: 10px;
`;
