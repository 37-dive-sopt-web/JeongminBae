import { Global, css, useTheme } from '@emotion/react';

const GlobalStyle = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        *, *::before, *::after {
          box-sizing: border-box;
        }

        html {
          font-size: 14px;
        }

        html, body, #root {
          height: 100%;
        }

        body {
          margin: 0;
          font-family: 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto,
            'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR',
            'Malgun Gothic', sans-serif;
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          display: block; /* override Vite template center layout */
        }

        button {
          font-family: inherit;
        }
      `}
    />
  );
};

export default GlobalStyle;
