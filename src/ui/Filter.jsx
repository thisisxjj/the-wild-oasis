import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.4rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`

function Filter({ field, options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  let currentFilter = searchParams.get(field)

  if (!options.map(({ value }) => value).includes(currentFilter)) {
    currentFilter = options[0].value
  }

  const handleClick = (value) => {
    searchParams.set(field, value)
    setSearchParams(searchParams)
  }

  return (
    <StyledFilter>
      {options.map(({ label, value }) => {
        return (
          <FilterButton
            key={value}
            active={value === currentFilter}
            onClick={() => handleClick(value)}
          >
            {label}
          </FilterButton>
        )
      })}
    </StyledFilter>
  )
}

export default Filter
