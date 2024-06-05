import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error('Cabins could not be loaded', error)

    throw new Error('Cabins could not be loaded')
  }

  return data
}

export async function createCabin(newCabin) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )

  // 如果不是上传图片的url
  if (!hasImagePath) {
    // Upload Image
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image)

    if (storageError) {
      console.log('Cabin image upload failed', storageError)
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created'
      )
    }

    // console.log('Cabin image was uploaded', data)
    newCabin.image = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  }

  const { data, error } = await supabase.from('cabins').insert([newCabin])

  if (error) {
    console.log('Cabin could not be created', error)

    throw new Error('Cabin could not be created')
  }

  return data
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId)

  if (error) {
    console.log('Cabin could not be deleted', error)

    throw new Error('Cabin could not be deleted')
  }

  return data
}
