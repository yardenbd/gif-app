import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
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
