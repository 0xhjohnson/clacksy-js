import { ChevronDownIcon,ChevronUpIcon } from '@heroicons/react/solid'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import clsx from 'clsx'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { upsertVote } from '@/lib/upsertVote'
import { UpsertVote,VOTE_TYPES, VoteGroupProps } from '@/types'

const VARIANTS = {
  [VOTE_TYPES.Downvote]: 'text-gray-700 bg-gray-100 hover:bg-gray-200',
  [VOTE_TYPES.Default]: 'text-gray-500 hover:bg-gray-50',
  [VOTE_TYPES.Upvote]: 'text-pink-700 bg-pink-100 hover:bg-pink-200',
}

export default function VoteGroup({
  totalVotes,
  userVote = 0,
  soundTestId,
}: VoteGroupProps) {
  const { user } = useUser()
  const [vote, setVote] = useState(userVote)
  const queryClient = useQueryClient()

  const voteMutation = useMutation(
    (voteData: UpsertVote) => upsertVote(voteData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('soundTests')
      },
    }
  )

  function handleUpvote() {
    const newVote = vote === 1 ? 0 : 1
    setVote(newVote)

    voteMutation.mutate({
      soundTestId,
      ownerId: user?.id,
      voteType: newVote,
    })
  }

  function handleDownvote() {
    const newVote = vote === -1 ? 0 : -1
    setVote(newVote)

    voteMutation.mutate({
      soundTestId,
      ownerId: user?.id,
      voteType: newVote,
    })
  }

  return (
    <span className="relative z-0 flex flex-col shadow-sm rounded-md">
      <button
        type="button"
        className={clsx(
          'relative inline-flex items-center px-2 py-2 rounded-t-md border border-gray-300 bg-white text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500',
          vote === VOTE_TYPES.Upvote
            ? VARIANTS[VOTE_TYPES.Upvote]
            : VARIANTS[VOTE_TYPES.Default]
        )}
        onClick={handleUpvote}
      >
        <span className="sr-only">
          {vote === VOTE_TYPES.Upvote ? 'remove upvote' : 'add upvote'}
        </span>
        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={clsx(
          '-mt-px relative inline-flex items-center px-2 py-2 rounded-b-md border border-gray-300 bg-white text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500',
          vote === VOTE_TYPES.Downvote
            ? VARIANTS[VOTE_TYPES.Downvote]
            : VARIANTS[VOTE_TYPES.Default]
        )}
        onClick={handleDownvote}
      >
        <span className="sr-only">
          {vote === VOTE_TYPES.Downvote ? 'remove downvote' : 'add downvote'}
        </span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </span>
  )
}
