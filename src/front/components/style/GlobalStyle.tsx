import { createGlobalStyle } from 'styled-components';

import { BoxModel, Half, MarginAndPadding } from './BoxModel';
import Color from './Color';
import { frameMaxWidthSmall, frameMaxWidthXsmall } from './Layout';
import Typo from './Typo';

const GlobalStyle = createGlobalStyle`
  ${Color}
  ${Typo}
  ${Half}

  * {
    background-color: rgb(26, 22, 22);
    color: rgb(241, 219, 205);
  }

  *:focus {
    outline: none;
  }

  a {
    color: rgb(241, 219, 205);
    text-decoration-line: none;
  }

  ${MarginAndPadding()}
  ${BoxModel()}
  @media (max-width: ${frameMaxWidthSmall}) {
    .m-img {
      max-width: 100%;
      width: 100% !important;
      height: auto !important;
    }
    ${MarginAndPadding('-sm')}
    ${BoxModel('-sm')}
  }
  @media (max-width: ${frameMaxWidthXsmall}) {
    ${MarginAndPadding('-xs')}
    ${BoxModel('-xs')}
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Noto Sans KR', sans-serif, '돋움', 'Dotum', helvetica;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    color: #212329;
    font-size: 14px;
    line-height: 1.4;
    letter-spacing: -0.04em;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p {
    margin: 0;
  }

  input[type=text], input[type=number], input[type=password], input[type=tel], input[type=datetime-local],input[type=date] {
    border-radius: 4px;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    outline: 0;
    background: none;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    height: 48px;
    padding: 0 35px 0 12px;
    border: 1px solid #212329;
    border-radius: 4px;
    font-size: 16px;
    line-height: 48px;
    letter-spacing: -0.4pt;

    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h16v16H0z'/%3E%3Cpath fill='%238E929F' fill-rule='nonzero' d='M5.354 6.646a.5.5 0 10-.708.708l3 3a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8 9.293 5.354 6.646z'/%3E%3C/g%3E%3C/svg%3E") no-repeat right 12px center;

    &:disabled {
      color: #212329;
    }

    &::-ms-expand {
      display: none;
    }
    &:focus::-ms-value {
      color: #212329;
      background-color: #fff;
    }
  }

  .disabled {
    pointer-events: none;
  }

  button {
    cursor: pointer;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* @mixin innerBorder($w, $h, $r) {
    width: $w;
    height: $h;
    border-radius: $r;
    position: relative;

    img {
      width: $w;
      height: $h;
      border-radius: $r;
    }

    &:after {
      display: block;
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: $w;
      height: $h;
      border-radius: $r;
      border: 1px solid rgba(33, 35, 41, 0.1);
    }
  } */
`;

export default GlobalStyle;
