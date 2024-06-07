import { useSearchParams } from 'react-router-dom'

export const useOptionsIncludeSearch = ({
  searchKey,
  options = [],
  defaultValue,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  if (options.length === 0) return defaultValue

  let searchValue = searchParams.get(searchKey)

  const isInOptions = options.map(({ value }) => value).includes(searchValue)

  if (!isInOptions) searchValue = defaultValue || options[0].value

  return {
    searchValue,
    searchParams,
    setSearchParams,
  }
}
