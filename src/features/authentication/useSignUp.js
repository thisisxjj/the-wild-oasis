import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signUp as signUpApi } from '../../services/apiAuth'

export const useSignUp = () => {
  const navigate = useNavigate()
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      )

      navigate('/login', { replace: true })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    signUp,
    isPending,
  }
}
