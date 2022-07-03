import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

import { UpsertVote } from '@/types'

export async function upsertVote({
  soundTestId,
  voteType,
  ownerId,
}: UpsertVote) {
  const { data, error } = await supabaseClient.from('vote').upsert({
    sound_test_id: soundTestId,
    owner_id: ownerId,
    vote_type: voteType,
  })
  if (error) {
    throw error
  }

  return data
}
