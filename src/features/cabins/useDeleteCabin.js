import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'

export const useDeleteCabin = () => {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted!')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (error) => {
      toast.error(`Cabin could not be deleted! ${error.message}`)
    },
  })

  return {
    isDeleting,
    deleteCabin,
  }
}
