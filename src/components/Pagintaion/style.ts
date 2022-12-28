import styled from "styled-components";
export const PaginationWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PagintionItem = styled.button`
  cursor: pointer;
  border: 1px solid lightblue;
  padding: 5px;
  background: transparent;
  :last-child() {
    border-left: none;
  }
  :first-child() {
    border-right: none;
  }
  &.active {
    background: lightgray;
  }
`;
