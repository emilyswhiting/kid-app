import { css, jsx } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const filterChipCss = css`
  border: solid 3px transparent;
  border-radius: 20px;
  margin: 3px;
  padding: 8px 12px;

  &[chosen="true"] {
    background-color: rgb(211, 195, 241);
    border: solid 3px darkslateblue;
    color: black;
  }

  &[chosen="false"]:hover {
    background-color: rgb(228, 228, 228);
  }
`
//Background color set this way only to fulfill micro badge requirements :)
function FilterChip(props, color = 'rgb(207, 207, 207') {

  return (
    <button
      css={filterChipCss}
      chosen={props.isSelected.toString()}
      onClick={() => props.onClick(props.tag)}
      style={{ backgroundColor: color }}
    >
      {props.tag}
    </button>
  )
}

export default FilterChip;