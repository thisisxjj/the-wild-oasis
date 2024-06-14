import supabase from './supabase'

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login error:', error)
    throw new Error(error.message)
  }

  return data
}

export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession()

  if (!sessionData.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data?.user
}
