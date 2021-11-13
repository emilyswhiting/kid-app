import { css, jsx } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const randomizeButtonCss = css`
  background-color: rgb(0, 118, 139);
  border: none;
  border-radius: 5px;
  color: white;
  margin: 20px;
  padding: 15px;

  &:hover {
    background-color: rgb(2, 148, 148);
  }
`

function RandomizeButton(props) {
  return (
    <button
      className="randomize-button"
      css={randomizeButtonCss}
      onClick={() => props.onClick()}
    >
      {props.clicked ? 'Select a different activity' : 'Select activity'}
    </button>
  );
}

export default RandomizeButton;