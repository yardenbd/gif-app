import styled, { css } from "styled-components";

const reuseableFlexbox = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AppWrapper = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
  gap: 15px;
`;

export const StyledForm = styled.form`
  ${reuseableFlexbox}
  gap: 15px;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  input {
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid grey;
    :focus {
      outline: none;
    }
  }
`;

export const RowContainer = styled.div`
  ${reuseableFlexbox}
  gap: 10px;

  &.filter {
    @media only screen and (max-width: 1100px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
