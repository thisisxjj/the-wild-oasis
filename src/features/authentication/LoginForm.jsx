import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import FormRowVertical from '../../ui/FormRowVertical'

import { useLogin } from './useLogin'

function LoginForm() {
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: 'test@gmail.com',
      password: 'test12345',
    },
  })

  const { login, isPending } = useLogin()

  const { errors } = formState

  function onSubmit({ email, password } = {}) {
    if (!email || !password) return

    login({ email, password })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          // This makes this form better for password managers
          autoComplete="username"
          {...register('email', {
            required: 'Please enter your email address',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Please enter a valid email address',
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.email?.password}>
        <Input
          type="password"
          id="password"
          disabled={isPending}
          autoComplete="current-password"
          {...register('password', {
            required: 'Please enter your password',
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isPending} size="large">
          {!isPending ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
