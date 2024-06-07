import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

export const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'checked-out', label: 'Checked Out' },
  { value: 'checked-in', label: 'Checked In' },
  { value: 'unconfirmed', label: 'Unconfirmed' },
]

export const sortByOptions = [
  { value: 'startDate-desc', label: 'Sort by date (recent first)' },
  { value: 'startDate-asc', label: 'Sort by date (earlier first)' },
  { value: 'totalPrice-desc', label: 'Sort by amount (high first)' },
  { value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
]

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter field="status" options={filterOptions} />

      <SortBy options={sortByOptions} />
    </TableOperations>
  )
}

export default BookingTableOperations
