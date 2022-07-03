import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useMutation } from 'react-query'

import { UserInfo } from '@/types'

async function signUp({ email, password }: UserInfo) {
  const { user, error: signUpError } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  })
  if (signUpError) {
    throw signUpError
  }

  return user
}

export default function useSignUp(userInfo: UserInfo) {
  return useMutation(() => signUp(userInfo))
}
