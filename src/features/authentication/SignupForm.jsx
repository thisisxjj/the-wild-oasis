import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useSignUp } from './useSignUp'
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, isPending } = useSignUp()
  const { formState, getValues, register, reset, handleSubmit } = useForm()

  const { errors } = formState

  const onSubmit = ({ fullName, email, password }) => {
    signUp(
      {
        fullName,
        email,
        password,
      },
      {
        onSettled: () => reset(),
      }
    )
  }

  const onError = () => {
    console.log('errors', errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register('fullName', {
            required: 'The field is required',
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register('email', {
            required: 'The field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register('password', {
            required: 'The field is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register('passwordConfirm', {
            required: 'The field is required',
            validate: (value) =>
              value === getValues()?.password || 'Passwords do not match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
