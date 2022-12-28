import styled from "styled-components";
import { Direction } from "../../types";

export const StyledGifsLayout = styled.div<{ direction: Direction }>`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 50%;
  margin-bottom: auto;
  flex-direction: ${(props) => props.direction};
  height: 100%;
  overflow-y: auto;
  img {
    width: 80px;
    height: 80px;
  }
  @media only screen and (max-width: 760px) {
    overflow-y: scroll;
  }
`;
