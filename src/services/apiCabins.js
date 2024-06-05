import supabase from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error('Cabins could not be loaded', error)

    throw new Error('Cabins could not be loaded')
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
