import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error('Cabins could not be loaded', error)

    throw new Error('Cabins could not be loaded')
  }

  return data
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )

  // 如果不是上传图片的url
  if (!hasImagePath) {
    // Upload Image
    const { data, error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image)

    if (storageError) {
      console.error('Cabin image upload failed', storageError)
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created'
      )
    }

    newCabin.image = `${supabaseUrl}/storage/v1/object/public/cabin-images/${data.path}`
  }

  let query = supabase.from('cabins')

  if (!id) {
    query = query.insert([newCabin])
  } else {
    query = query.update(newCabin).eq('id', id)
  }

  const { data, error } = await query.select().single()

  if (error) {
    console.error('Cabin could not be created', error)

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
    console.error('Cabin could not be deleted', error)

    throw new Error('Cabin could not be deleted')
  }

  return data
}
