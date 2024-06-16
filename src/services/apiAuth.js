import supabase, { supabaseUrl } from './supabase'

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  })

  if (error) {
    console.error('sign up error:', error)
    throw new Error(error.message)
  }

  return data
}

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

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('logout went something error: ', error)
    throw new Error(error.message)
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)

  const hasAvatarPath = avatar?.startsWith?.(supabaseUrl)
  if (!avatar || hasAvatarPath) return data

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar)

  if (storageError) throw new Error(storageError.message)

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  })

  if (error2) throw new Error(error2.message)
  return updatedUser
}
