import styled from 'styled-components';
import { DropzoneRootProps } from 'react-dropzone';

export const Container = styled.div<DropzoneRootProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 300px;
  margin-top: 48px;
  border-radius: 10px;
  outline: 0;
  background: #e1faec;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border: 1px dashed #4ecb79;
    border-radius: 10px;
    color: #333;

    svg {
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
      color: #4ecb79;
    }
  }
`;
