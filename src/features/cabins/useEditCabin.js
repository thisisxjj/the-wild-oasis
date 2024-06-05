import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCabin } from '../../services/apiCabins'

export const useEditCabin = () => {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited!')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (error) => toast.error(error.message),
  })

  return {
    editCabin,
    isEditing,
  }
}
