import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'

import { Keyboard } from '@/types'

const MAX_RESULTS = 10

export async function getKeyboards(searchTerm: string) {
  const { data: keyboards, error } = await supabaseClient
    .from<Keyboard>('keyboard')
    .select('keyboard_id, name')
    .ilike('name', `%${searchTerm}%`)
    .order('name', { ascending: true })
    .limit(MAX_RESULTS)
  if (error) {
    throw error
  }

  return keyboards
}

export default function useKeyboards(searchTerm: string = '') {
  return useQuery(['keyboards', searchTerm], () => getKeyboards(searchTerm))
}
