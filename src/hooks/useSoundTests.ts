import { useQuery } from 'react-query'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { SoundTest, SoundTestSort } from '@/types'

export async function getSoundTests(sort: SoundTestSort = 'latest', page = 0) {
  const rpcHandler =
    sort === 'latest' ? 'get_latest_sound_tests' : 'get_popular_sound_tests'

  const { data: soundTests, error } = await supabaseClient.rpc<SoundTest>(
    rpcHandler,
    {
      page,
    }
  )
  if (error) {
    throw error
  }

  return soundTests
}

export default function useSoundTests(sort: SoundTestSort, page: number) {
  return useQuery(['soundTests', sort, page], () => getSoundTests(sort, page), {
    keepPreviousData: true,
  })
}
