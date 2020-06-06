import styled from 'styled-components';

import backgroundImg from '../../assets/home-background.svg';

export const Container = styled.div`
  height: 100vh;
  background: url(${backgroundImg}) no-repeat 60% bottom;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  @media (max-width: 900px) {
    align-items: center;

    text-align: center;
  }

  header {
    margin: 48px 0 0;

    @media (max-width: 900px) {
      margin: 48px auto 0;
    }
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    max-width: 560px;

    @media (max-width: 900px) {
      align-items: center;

      h1 {
        font-size: 42px;
      }

      p {
        font-size: 24px;
      }
    }

    h1 {
      font-size: 54px;
      color: #322153;
    }

    p {
      margin-top: 24px;
      line-height: 38px;
      font-size: 24px;
    }

    a {
      display: flex;
      align-items: center;
      overflow: hidden;

      width: 100%;
      height: 72px;
      max-width: 360px;
      margin-top: 40px;
      border-radius: 8px;
      background: #34cb79;
      text-decoration: none;

      &:hover {
        background: #2fb86e;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 72px;
        height: 72px;
        background: rgba(0, 0, 0, 0.08);
        transition: background-color 0.2s;

        svg {
          width: 20px;
          height: 20px;
          color: #fff;
        }
      }

      strong {
        flex: 1;

        text-align: center;
        color: #fff;
      }
    }
  }
`;
