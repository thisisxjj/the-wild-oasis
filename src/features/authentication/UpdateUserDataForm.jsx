import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUser } from './useUser'
import { useUpdateUser } from './useUpdateUser'
import { useForm } from 'react-hook-form'

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatar = '' },
    },
  } = useUser()

  const { updateUser, isUpdating } = useUpdateUser()

  const { formState, handleSubmit, register, reset } = useForm({
    defaultValues: { fullName: currentFullName, avatar: currentAvatar },
  })

  const { errors } = formState

  const handleReset = () =>
    reset({
      fullName: '',
      avatar: '',
    })

  const onSubmit = ({ avatar, fullName }) => {
    const avatarTemp = typeof avatar === 'string' ? avatar : avatar[0]
    updateUser(
      {
        fullName,
        avatar: avatarTemp,
      },
      {
        onSuccess: handleReset,
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isUpdating}
          {...register('fullName', {
            required: 'The field is required',
          })}
        />
      </FormRow>
      <FormRow label="Avatar image" error={errors?.avatar?.message}>
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          {...register('avatar', {
            validate: (value) => {
              return (!!value && value.length > 0) || 'The field is required'
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          disabled={isUpdating}
          variation="secondary"
          onClick={handleReset}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
