import { css, jsx } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const divCss = css`
  display: none;
  margin: 20px 0 0 0;

  &[pressed="true"] {
    display: block;
  }
`
const textCss = css`
  margin: 0;
  text-align: center;
`
function ActivitySuggestion(props) {
  return (
    <div
      pressed={props.clicked.toString()}
      css={divCss}
    >
      <p css={textCss}>You should</p>
      <h3 css={textCss}>{props.activity}!</h3>
    </div>
  );
}

export default ActivitySuggestion;