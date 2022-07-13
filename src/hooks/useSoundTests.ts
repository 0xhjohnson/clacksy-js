import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'

import { SoundTest, SoundTestSort, UserVote } from '@/types'

export async function getSoundTests(
  sort: SoundTestSort = 'latest',
  page = 0,
  userId: string | undefined
) {
  const rpcHandler =
    sort === 'latest' ? 'get_latest_sound_tests' : 'get_popular_sound_tests'

  const { data: soundTests, error: soundTestsError } =
    await supabaseClient.rpc<SoundTest>(rpcHandler, {
      page
    })
  if (soundTestsError) {
    throw soundTestsError
  }

  if (userId) {
    const { data: userVotes, error: userVotesError } = await supabaseClient
      .from<UserVote>('vote')
      .select(
        `
      sound_test_id,
      owner_id,
      vote_type,
      created_at
    `
      )
      .eq('owner_id', userId)
      .in(
        'sound_test_id',
        soundTests.map((soundTest) => soundTest.sound_test_id)
      )

    userVotes?.forEach((userVote) => {
      const foundIdx = soundTests.findIndex(
        (soundTest) => soundTest.sound_test_id === userVote.sound_test_id
      )
      soundTests[foundIdx].userVote = userVote.vote_type
    })
  }

  return soundTests
}

export default function useSoundTests(
  sort: SoundTestSort,
  page: number,
  userId: string | undefined
) {
  return useQuery(
    ['soundTests', sort, page, userId],
    () => getSoundTests(sort, page, userId),
    {
      keepPreviousData: true
    }
  )
}
