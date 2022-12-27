import styled from "styled-components";

export const StyledGifsLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 50%;
  margin-bottom: auto;
  img {
    width: 80px;
    height: 80px;
  }
  @media only screen and (max-width: 760px) {
    overflow-y: scroll;
  }
`;
