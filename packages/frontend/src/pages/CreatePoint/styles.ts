import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 48px;

    a {
      display: flex;
      align-items: center;

      color: #322153;
      font-weight: bold;
      text-decoration: none;

      svg {
        margin-right: 16px;
        color: #34cb79;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;

    max-width: 730px;
    margin: 80px auto;
    padding: 64px;
    border-radius: 8px;
    background: #fff;

    h1 {
      font-size: 36px;
    }

    fieldset {
      min-inline-size: auto;
      margin-top: 64px;
      border: 0;
    }

    legend {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      margin-bottom: 40px;

      h2 {
        font-size: 24px;
      }

      span {
        font-size: 14px;
        font-weight: normal;
        color: #6c6c80;
      }
    }

    .leaflet-container {
      width: 100%;
      height: 350px;
      margin-bottom: 24px;
      border-radius: 8px;
    }
  }
`;

export const FieldGroup = styled.div`
  flex: 1;
  display: flex;

  div + div {
    margin-left: 24px;
  }
`;

export const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  margin-bottom: 24px;

  label {
    font-size: 14px;
    margin-bottom: 8px;
  }

  input {
    & + input {
      margin-left: 24px;
    }

    &::placeholder {
      color: #a0a0b2;
    }
  }

  input[type='text'],
  input[type='email'],
  input[type='number'] {
    flex: 1;

    padding: 16px 24px;
    border: 0;
    border-radius: 8px;
    color: #6c6c80;
    background: #f0f0f5;
    font-size: 16px;
  }

  select {
    flex: 1;

    padding: 16px 24px;
    border: 0;
    border-radius: 8px;
    color: #6c6c80;
    background: #f0f0f5;
    font-size: 16px;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export const FieldCheck = styled.div`
  align-items: center;

  label {
    margin: 0 0 0 8px;
  }

  input[type='checkbox'] {
    background: #f0f0f5;
  }
`;

export const ItensGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

interface ItensGridItemProps {
  isSelected?: boolean;
}

export const ItensGridItem = styled.li<ItensGridItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 180px;
  padding: 32px 24px 16px;
  border: 2px solid #f5f5f5;
  border-radius: 8px;
  background: #f5f5f5;
  text-align: center;

  cursor: pointer;

  ${props =>
    props.isSelected &&
    css`
      border: 2px solid #34cb79;
      background: #e1faec;
    `}

  span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    align-items: center;
    color: #322153;
  }
`;

export const FormSubmit = styled.button.attrs({
  type: 'submit',
})`
  align-self: flex-end;

  width: 260px;
  height: 56px;
  margin-top: 40px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: #34cb79;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s;

  cursor: pointer;

  &:hover {
    background: #2fb86e;
  }
`;

interface FormModalSuccessProps {
  isOpen?: boolean;
}

export const FormModalSuccess = styled.div<FormModalSuccessProps>`
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background: rgba(14, 10, 20, 0.8);
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.2s, opacity 0.3s 0.1s;

  ${props =>
    props.isOpen &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}

  h3 {
    margin-top: 24px;
    color: #fff;
    font-size: 36px;
  }
`;
