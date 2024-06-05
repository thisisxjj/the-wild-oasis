import toast from 'react-hot-toast'

import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'

import { createEditCabin } from '../../services/apiCabins'

const CreateCabinForm = ({ cabinToEdit = {} }) => {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const queryClient = useQueryClient()
  const { handleSubmit, getValues, register, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })

  const { errors } = formState

  const { mutate: addCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created!')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      reset()
    },
    onError: (error) => toast.error(error.message),
  })

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited!')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      reset()
    },
    onError: (error) => toast.error(error.message),
  })

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditSession) {
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset()
          },
        }
      )
    } else {
      addCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset()
          },
        }
      )
    }
  }

  const isWorking = isCreating || isEditing

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'The field is required',
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'The field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'The field is required',
            min: {
              value: 1,
              message: 'regularPrice should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'The field is required',
            validate: (value) => {
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                'Discount should be less than regular price'
              )
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description', {
            required: 'The field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            validate: (value) => {
              return !!value || 'The field is required'
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
