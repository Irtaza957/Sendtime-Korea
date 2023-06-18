import { css } from '@emotion/react';

const colors = css`
  :root {
    --white: #fff;
    --white-50: #fffff50;
    --purple-50: #f0effa;
    --purple-100: #e0def5;
    --purple-200: #c1beea;
    --purple-300: #a39de0;
    --purple-400: #847dd5;
    --purple-500: #6056db;
    --purple-600: #4c4598;
    --purple-700: #332e66;
    --purple-800: #191733;
    --purple-900: #0a0914;
    --gray-50: #f9fafc;
    --gray-100: #f2f5f7;
    --gray-200: #e5eaf0;
    --gray-300: #d9e0e8;
    --gray-400: #ccd5e1;
    --gray-500: #bfcbd9;
    --gray-550: #a6b5c6;
    --gray-600: #8f98a3;
    --gray-650: #717780;
    --gray-700: #60666d;
    --gray-750: #434950;
    --gray-800: #303336;
    --gray-800-30: rgba(48, 51, 54, 0.3);
    --gray-900: #131416;
    --alert: #eb5757;
    --unavailable: #d95252;
    --unavailable-50: #eb575715;
    --unavailable-100: #ffd4d4;
    --confirm: #27ae60;
    --link-blue: #2f80ed;
    --dark-blue: #383cc1;
    --banner-gray: #58697c;

    --blue-300: #87aefc;
    --blue-400: #6995f9;
    --blue-500-light: #3cabdb;
    --blue-500: #3970ff;
    --blue-600: #1c3db1;
    --blue-700: #11298e;
    --blue-800: #0a1c76;

    --none: rgba(256, 256, 256, 0);
    --gray-50-50: #f0effa50;
    --gray-200-50: #e5eaf050;
    --gray-400-80: #ccd5e180;
    --gray-600-25: #8f98a325;
    --gray-800-70: rgba(48, 51, 54, 0.7);
    --purple-100-50: #e0def550;
    --purple-200-50: #c1beea50;
    --purple-600-50: #4c459850;

    --orange-500: #ff9500;
    --red: #ef2f2f;
    --red-50: #ef2f2f20;
    --red-500: #ef4444;
    --cancel: #c01c42;

    --mobile-active: #5039dc;
    --mobile-button-border: #5939dc70;
    --mobile-hover: #0500ff10;
  }
`;

const overrides = css`
  :root {
    --fc-small-font-size: 12px;
    --fc-page-bg-color: #fff;
    --fc-neutral-bg-color: rgba(208, 208, 208, 0.3);
    --fc-neutral-text-color: #808080;
    --fc-border-color: var(--gray-400);

    --fc-button-text-color: var(--gray-800);
    --fc-button-bg-color: var(--white);
    --fc-button-border-color: var(--gray-300);
    --fc-button-hover-bg-color: var(--gray-200);
    --fc-button-hover-border-color: var(--gray-600);
    --fc-button-active-bg-color: var(--gray-100);
    --fc-button-active-border-color: var(--gray-600);

    --fc-event-bg-color: transparent;
    --fc-event-border-color: var(--gray-400);
    --fc-event-text-color: #fff;
    --fc-event-selected-overlay-color: rgba(0, 0, 0, 0.25);

    --fc-more-link-bg-color: #d0d0d0;
    --fc-more-link-text-color: inherit;

    --fc-event-resizer-thickness: 8px;
    --fc-event-resizer-dot-total-width: 8px;
    --fc-event-resizer-dot-border-width: 1px;

    /* --fc-non-business-color: repeating-linear-gradient(
      135deg,
      #f9fafc80 0px,
      #f9fafc80 1px,
      #f9fafc80 2px,
      #f9fafc80 3px,
      #f9fafc80 4px,
      var(--gray-300) 5px,
      #f9fafc80 6px,
      #f9fafc80 7px,
      #f9fafc80 8px,
      #f9fafc80 9px,
      #f9fafc80 10px,
      var(--gray-300) 11px,
      #f9fafc80 12px,
      #f9fafc80 13px
    ); */

    // --fc-non-business-color: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuX0JCM1VXIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoMTM1KSI+PGxpbmUgeDE9IjAiIHk9IjAiIHgyPSIwIiB5Mj0iNCIgc3Ryb2tlPSIjQ0NENUUxIiBzdHJva2Utd2lkdGg9IjIiLz48L3BhdHRlcm4+PC9kZWZzPiA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm5fQkIzVVcpIiBvcGFjaXR5PSIxIi8+PC9zdmc+');
    --fc-non-business-color: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuX0JCS3U3NiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQuNSIgaGVpZ2h0PSI0LjUiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48bGluZSB4MT0iMCIgeT0iMCIgeDI9IjAiIHkyPSI0LjUiIHN0cm9rZT0iIzdGN0Y3RiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuX0JCS3U3NikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=');
    --unavailable-time: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuX280ZnI3IiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMTYuNSIgaGVpZ2h0PSIxNi41IiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48bGluZSB4MT0iMCIgeT0iMCIgeDI9IjAiIHkyPSIxNi41IiBzdHJva2U9IiM4Rjk4QTMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+IDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybl9vNGZyNykiIG9wYWNpdHk9IjEiLz48L3N2Zz4=');

    /* --fc-guest-non-business-color: repeating-linear-gradient(
      135deg,
      #f9fafc80 0px,
      #f9fafc80 1px,
      #f9fafc80 2px,
      #f9fafc80 3px,
      #f9fafc80 4px,
      var(--gray-550) 5px,
      #f9fafc80 6px,
      #f9fafc80 7px,
      #f9fafc80 8px,
      #f9fafc80 9px,
      #f9fafc80 10px,
      var(--gray-550) 11px,
      #f9fafc80 12px,
      #f9fafc80 13px
    ); */
    // --fc-guest-non-business-color: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuX0JCM1VXIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoMTM1KSI+PGxpbmUgeDE9IjAiIHk9IjAiIHgyPSIwIiB5Mj0iNCIgc3Ryb2tlPSIjQTZCNUM2IiBzdHJva2Utd2lkdGg9IjIiLz48L3BhdHRlcm4+PC9kZWZzPiA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm5fQkIzVVcpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')
    --fc-guest-non-business-color: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuX0JCS3U3NiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQuNSIgaGVpZ2h0PSI0LjUiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48bGluZSB4MT0iMCIgeT0iMCIgeDI9IjAiIHkyPSI0LjUiIHN0cm9rZT0iIzdGN0Y3RiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuX0JCS3U3NikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=');

    --fc-bg-event-color: rgb(143, 223, 130);
    --fc-bg-event-opacity: 0.3;
    --fc-highlight-color: var(--gray-400);
    /* --fc-today-bg-color: rgba(255, 220, 40, 0.15); */
    --fc-today-bg-color: var(--white);
    --fc-now-indicator-color: red;

    --block-outer: #e25050;
    --block-inner: #ff001f20;

    @media (max-width: 425px) {
      :root {
        /* 작은 모바일일 경우 들어갈 global variables */
      }
    }

    @media (max-width: 768px) {
      :root {
        /* 큰 모바일일 경우 들어갈 global variables */
      }
    }

    @media (max-width: 1200px) {
      :root {
        /* 태블릿일 경우 들어갈 global variables */
      }
    }
  }
`;

const etc = css`
  :root {
    --shadow: 0 4px 50px 0 rgba(191, 203, 217, 0.15);

    --modal-front: 9999;
    --modal-very-front: 99991;

    --very-very-front: 999999999999;
    --very-front: 999999;
    --front: 888888;
    --middle: 777777;
    --semi-middle: 666666;

    --back: -1;
    --zero: 0;
    --one: 1;
    white-space: pre-line;
  }
`;

const font = css`
  :root {
    --thin: 100;
    --extra-light: 200;
    --light: 300;
    --normal: 400;
    --regular: 500;
    --semi-bold: 600;
    --bold: 700;
    --extra-bold: 800;
    --black: 900;
  }

  @font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff')
      format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSansKR-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-SemiBold.woff')
      format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css')
      format('css');
    font-style: normal;
  }
`;

const globalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

  * {
    font-family: 'Pretendard', system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
    color: var(--gray-700);
  }

  font {
    color: inherit;
    background-color: inherit;
    background: inherit;
    min-width: unset;
    width: unset;
    max-width: unset;
    min-height: unset;
    height: unset;
    max-height: unset;
  }

  path {
    color: inherit;
  }

  html {
    height: 100%;

    @media (max-width: 768px) {
      justify-content: flex-start;
      height: auto;
    }
  }

  html,
  body,
  #__next {
    cursor: default;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    background: var(--gray-50);
    scroll-behavior: smooth;
    min-height: 100%;
    width: 100%;
  }

  body {
    height: 100%;

    @media (max-width: 768px) {
      justify-content: flex-start;
      height: auto;
    }
  }

  input,
  img {
    user-select: none;
  }

  #__next {
    padding: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: auto;
    overflow: auto;

    @media (max-width: 768px) {
      justify-content: flex-start;
      background: var(--white);
      min-height: 100vh;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
    &:visited {
      color: inherit;
    }
  }

  li {
    list-style: none;
  }

  button {
    cursor: pointer;
    background: none;
    border: 0;
    color: inherit;
  }

  input::-ms-clear,
  input::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }

  input {
    -webkit-user-select: text;
  }

  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: middle;
    background: inherit;
  }

  h1 {
    font-size: 24px;
    font-weight: var(--regular);
  }

  h2 {
    font-size: 18px;
    font-weight: var(--normal);
  }

  h3 {
    font-size: 14px;
    font-weight: var(--normal);
  }

  /*  */

  .ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 22px;
    height: 22px;
    border: 2px solid rgba(31, 30, 30, 0.808);
    border-radius: 100%;
    transform: translate(-50%, -50%);
    -webkit-transition-duration: 100ms;
    transition-duration: 100ms;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    will-change: width, height, transform, border;
    z-index: 999;
    pointer-events: none;
  }

  // React/Toastify custom style

  .Toastify__toast-container {
    padding: 0;
    width: 358px;
    bottom: 2em;
    left: 2em;
    z-index: var(--very-front);
  }

  .Toastify__toast {
    width: 100%;
    border-radius: 4px;
    box-shadow: 0px 4px 12px rgba(19, 20, 22, 0.18);
    padding: 8px;
    margin-bottom: 0px;
  }

  .Toastify__toast-body .Toastify__toast-icon {
    padding: 7px 0 0;
  }

  .Toastify__toast--success {
    border: 1px solid #26df5a;
  }

  .Toastify__toast--success svg {
    fill: #26df5a;
  }

  .Toastify__toast--error {
    border: 1px solid #e74c3c;
  }

  .Toastify__close-button {
    display: none;
  }

  .Toastify__toast-body > div {
    font-weight: 700;
    color: black;
    line-height: 24px;
    // for overflow text
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 640px) {
    .Toastify__toast-container {
      padding: 16px;
      width: 100%;
      min-height: 80px;
      height: 80px;
      bottom: 32px;
      left: 0;
    }
  }
`;

const animations = css`
  @keyframes bounceLeft {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(0);
    }
    40% {
      transform: translateX(-8px);
    }
    60% {
      transform: translateX(8px);
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #5039dc60;
    }

    70% {
      box-shadow: 0 0 0 10px #655ccb00;
    }

    100% {
      box-shadow: 0 0 0 0 #655ccb00;
    }
  }

  @keyframes slideTopReverse {
    30% {
      transform: translateY(-40px);
    }
    60% {
      transform: translateY(-40px);
    }

    80% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes slideTopInfinite {
    0% {
      transform: translateY(200%);
    }

    10% {
      transform: translateY(6%);
    }
    20% {
      transform: translateY(6%);
    }

    30% {
      transform: translateY(-122%);
    }
    40% {
      transform: translateY(-122%);
    }

    50% {
      transform: translateY(-250%);
    }
    60% {
      transform: translateY(-250%);
    }

    70% {
      transform: translateY(-380%);
    }
    80% {
      transform: translateY(-380%);
    }

    100% {
      transform: translateY(-600%);
    }
  }

  @keyframes slideRight {
    0% {
      transform: translateX(-150px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  @keyframes blink {
    0% {
      filter: brightness(0.6);
    }

    100% {
      filter: brightness(1);
    }
  }
`;

const transitions = css`
  .fade-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit-active {
    opacity: 0;
    transform: translateX(100%);
  }
  .fade-enter-active,
  .fade-exit-active {
    transition: opacity 500ms, transform 500ms;
  }
`;

export { animations, colors, etc, font, globalStyle, overrides, transitions };

/* 3개
0% {
  transform: translateY(200%);
}

20% {
  transform: translateY(0%);
}
30% {
  transform: translateY(0%);
}

50% {
  transform: translateY(-120%);
}
60% {
  transform: translateY(-120%);
}

80% {
  transform: translateY(-255%);
}
90% {
  transform: translateY(-255%);
}

100% {
  transform: translateY(-400%);
}



*/
