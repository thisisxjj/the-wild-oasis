import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { filterOptions } from './DashboardFilter'
import { getStaysAfterDate } from '../../services/apiBookings'
import { useOptionsIncludeSearch } from '../../hooks/useOptionsIncludeSearch'
import { useMemo } from 'react'

export const useRecentStays = () => {
  const { searchValue } = useOptionsIncludeSearch({
    searchKey: 'last',
    options: filterOptions,
  })

  const numDays = Number(searchValue)

  const queryStartDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: stays } = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryStartDate),
  })

  const confirmedStays = useMemo(
    () =>
      stays?.filter(
        ({ status }) => status === 'checked-in' || status === 'checked-out'
      ),
    [stays]
  )

  return {
    isLoading,
    stays,
    confirmedStays,
    numDays,
  }
}
