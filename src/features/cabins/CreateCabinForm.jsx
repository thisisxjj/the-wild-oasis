import toast from 'react-hot-toast'

import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'

import { createCabin } from '../../services/apiCabins'

const CreateCabinForm = () => {
  const queryClient = useQueryClient()
  const { handleSubmit, getValues, register, formState, reset } = useForm()

  const { errors } = formState

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created!')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      reset()
    },
    onError: (error) => toast.error(error.message),
  })

  const onSubmit = (data) => {
    mutate({ ...data, image: data.image[0] })
  }

  const onError = (error) => {
    console.log(error)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'The field is required',
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
            required: 'The field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
