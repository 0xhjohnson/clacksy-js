import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useQuery } from 'react-query'

import { Keyswitch } from '@/types'

const MAX_RESULTS = 10

export async function getSwitches(searchTerm: string) {
  const { data: switches, error } = await supabaseClient
    .from<Keyswitch>('keyswitch')
    .select(
      `
      keyswitch_id,
      name,
      keyswitch_type (
        name
      )
    `
    )
    .ilike('name', `%${searchTerm}%`)
    .order('name', { ascending: true })
    .limit(MAX_RESULTS)
  if (error) {
    throw error
  }

  return switches
}

export default function useSwitches(searchTerm: string = '') {
  return useQuery(['switches', searchTerm], () => getSwitches(searchTerm))
}
