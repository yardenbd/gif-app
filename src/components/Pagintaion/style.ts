import styled from "styled-components";
export const PaginationWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  select {
    margin-left: 10px;
  }
`;

export const PagintionItem = styled.a`
  cursor: pointer;
  border: 1px solid lightblue;
  padding: 5px;
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
