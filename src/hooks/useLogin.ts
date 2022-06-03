import { useMutation } from 'react-query'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { UserInfo } from '@/types'

async function login({ email, password }: UserInfo) {
  const { user, error: loginError } = await supabaseClient.auth.signIn({
    email: email,
    password: password,
  })
  if (loginError) {
    throw loginError
  }

  return user
}

export default function useLogin(userInfo: UserInfo) {
  return useMutation(() => login(userInfo))
}
