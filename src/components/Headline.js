import { css, jsx } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const headlineCss = css`
  font-size: 1.75em;
  text-align: center;
`

function Headline(props) {
  return (
    <h1 css={headlineCss}>
      What should you do with your kids today?
    </h1>
  );
}

export default Headline;