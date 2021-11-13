import FilterChip from './FilterChip';
import { css, jsx } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const filterGroupCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px 0;
`

function FilterGroup(props) {
  const filters = [];
  for (const tag of props.availableFilters) {
    filters.push(
      <FilterChip
        isSelected={
          props.selectedFilters.includes(tag)
        }
        key={tag}
        onClick={() => props.addRemoveFilter(tag)}
        tag={tag}
      />
    );
  }

  return (
    <div
      className="filter-group"
      css={filterGroupCss}
    >
      {filters}
    </div>
  );
}

export default FilterGroup;