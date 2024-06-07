import Select from './Select'
import { useOptionsIncludeSearch } from '../hooks/useOptionsIncludeSearch'

function SortBy({ options }) {
  const {
    searchValue: sortBy,
    searchParams,
    setSearchParams,
  } = useOptionsIncludeSearch({
    searchKey: 'sortBy',
    options,
  })

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  )
}

export default SortBy
