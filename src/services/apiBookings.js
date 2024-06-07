import supabase from './supabase'
import { PAGE_SIZE } from '../utils/constants'

export async function getBookings({ filter, sortBy, page } = {}) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
      { count: 'exact' }
    )

  if (filter !== null)
    query = query[filter.method || 'eq'](filter.field, filter.value)

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    })

  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    query = query.range(from, to)
  }
  const { data, count, error } = await query

  if (error) {
    console.error('Bookings could not be loaded', error)

    throw new Error('Bookings could not be loaded')
  }

  return { data, count }
}
