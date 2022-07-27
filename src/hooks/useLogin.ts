import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

import { UserInfo } from '@/types'
import { isSupabaseError } from '@/utils'

async function login({ email, password }: UserInfo) {
  const { user, error: loginError } = await supabaseClient.auth.signIn({
    email: email,
    password: password
  })
  if (loginError) {
    throw loginError
  }

  return user
}

export default function useLogin(userInfo: UserInfo) {
  return useMutation(() => login(userInfo), {
    onError(error) {
      if (isSupabaseError(error)) {
        toast.error(error.message)
      }
    }
  })
}
