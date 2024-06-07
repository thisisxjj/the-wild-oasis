import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { filterOptions, sortByOptions } from './BookingTableOperations'
import { useOptionsIncludeSearch } from '../../hooks/useOptionsIncludeSearch'
import { PAGE_SIZE } from '../../utils/constants'

export const useBookings = () => {
  const queryClient = useQueryClient()
  const { searchParams, searchValue: filterValue } = useOptionsIncludeSearch({
    searchKey: 'status',
    options: filterOptions,
  })
  const { searchValue: sortByValue } = useOptionsIncludeSearch({
    searchKey: 'sortBy',
    options: sortByOptions,
  })

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' }

  const [field, direction] = sortByValue.split('-')
  const sortBy = { field, direction }

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE)

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })

  return {
    isLoading,
    bookings,
    count,
    error,
  }
}
