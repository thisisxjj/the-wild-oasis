import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { filterOptions } from './DashboardFilter'
import { getBookingsAfterDate } from '../../services/apiBookings'
import { useOptionsIncludeSearch } from '../../hooks/useOptionsIncludeSearch'

export const useRecentBookings = () => {
  const { searchValue } = useOptionsIncludeSearch({
    searchKey: 'last',
    options: filterOptions,
  })

  const numDays = Number(searchValue)

  const queryStartDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryStartDate),
  })

  return {
    isLoading,
    bookings,
  }
}
