import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useMutation, useQueryClient } from 'react-query'

async function signOut() {
  const { error } = await supabaseClient.auth.signOut()

  if (error) {
    throw error
  }
}

export default function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation(signOut, {
    onSuccess: () => queryClient.removeQueries(),
  })
}
