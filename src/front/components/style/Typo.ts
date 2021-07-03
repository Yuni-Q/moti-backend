import { css } from 'styled-components';

import { frameMaxWidthXsmall, frameMaxWidthSmall } from './Layout';

const Typo = css`
  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
  h5,
  .h5,
  h6,
  .h6 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: normal;
  }

  h1,
  .h1 {
    font-size: 44px;
    line-height: 64px;
    letter-spacing: -1.2px;
    .banner {
      line-height: 56px;
    }
  }

  h2,
  .h2 {
    font-size: 32px;
    line-height: 48px;
    letter-spacing: -1.2px;
  }

  .h3 {
    font-size: 22px;
    line-height: 32px;
    letter-spacing: -0.4px;
  }

  h4,
  .h4 {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.4px;
  }

  h5,
  .h5 {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.4px;
  }

  h6,
  .h6 {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.4px;
  }

  @media (max-width: ${frameMaxWidthSmall}) {
    .h1-sm {
      font-size: 44px;
      line-height: 64px;
      letter-spacing: -1.2px;
      .banner {
        line-height: 56px;
      }
    }

    .h2-sm {
      font-size: 32px;
      line-height: 48px;
      letter-spacing: -1.2px;
    }

    .h3-sm {
      font-size: 22px;
      line-height: 32px;
      letter-spacing: -0.4px;
    }

    .h4-sm {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: -0.4px;
    }

    .h5-sm {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.4px;
    }

    .h6-sm {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.4px;
    }
  }

  @media (max-width: ${frameMaxWidthXsmall}) {
    .h1-xs {
      font-size: 44px;
      line-height: 64px;
      letter-spacing: -1.2px;
    }

    .h2-xs {
      font-size: 32px;
      line-height: 48px;
      letter-spacing: -1.2px;
    }

    .h3-xs {
      font-size: 22px;
      line-height: 32px;
      letter-spacing: -0.4px;
    }

    .h4-xs {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: -0.4px;
    }

    .h5-xs {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.4px;
    }

    .h6-xs {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.4px;
    }
  }

  .font-size-normal {
    font-size: 14px;
  }

  .block {
    font-size: 16px;
    line-height: 32px;
    letter-spacing: -0.4px;
    font-weight: 300;
  }

  .bold {
    font-weight: bold;
  }
  .bolder {
    font-weight: bolder;
  }

  .align-baseline {
    vertical-align: baseline !important;
  }
  .align-top {
    vertical-align: top !important;
  }
  .align-middle {
    vertical-align: middle !important;
  }
  .align-bottom {
    vertical-align: bottom !important;
  }
  .align-text-bottom {
    vertical-align: text-bottom !important;
  }
  .align-text-top {
    vertical-align: text-top !important;
  }

  .text-center {
    text-align: center !important;
  }
  .text-right {
    text-align: right !important;
  }
  .text-left {
    text-align: left !important;
  }
  .text-justify {
    text-align: justify !important;
  }
  .text-wrap {
    white-space: normal !important;
  }
  .text-nowrap {
    white-space: nowrap !important;
  }
  .text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text-lowercase {
    text-transform: lowercase !important;
  }
  .text-uppercase {
    text-transform: uppercase !important;
  }
  .text-capitalize {
    text-transform: capitalize !important;
  }

  .font-weight-light {
    font-weight: 300 !important;
  }
  .font-weight-lighter {
    font-weight: lighter !important;
  }
  .font-weight-normal {
    font-weight: 400 !important;
  }
  .font-weight-medium {
    font-weight: 500 !important;
  }
  .font-weight-bold {
    font-weight: 700 !important;
  }
  .font-weight-bolder {
    font-weight: bolder !important;
  }
  .font-italic {
    font-style: italic !important;
  }

  .text-break {
    word-break: break-word !important; // IE & < Edge 18
    overflow-wrap: break-word !important;
  }

  .text-break-all {
    word-break: break-all !important;
  }

  .text-small {
    font-size: 85%;
  }

  .text-xsmall {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.2px;
  }

  ul.hr {
    list-style: none;
    padding: 0;
    margin: 0 0 0 -10px;

    li {
      display: inline-block;
      margin-left: 10px;
      margin-right: 10px;
      &:after {
        content: '';
        line-height: 10px;
        display: inline-block;
        width: 1px;
        height: 10px;
        overflow: hidden;
        position: relative;
        right: -9px;
        background-color: black;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }

  .btn-text {
    border: none;
    display: inline;
    padding: 0;
    margin: 0;
  }

  .position-absolute {
    position: absolute;
  }

  .text-ellipsis {
    white-space: normal;
    line-height: 1.4;
    height: 1.4em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
  }

  _:-ms-fullscreen,
  :root .text-ellipsis {
    white-space: nowrap;
  }

  .text-ellipsis-3 {
    white-space: normal;
    line-height: 1.43;
    height: 4.29em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
  }
`;

export default Typo;
