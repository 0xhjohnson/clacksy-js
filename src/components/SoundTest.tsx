import useSoundTestAudio from '@/hooks/useSoundTestAudio'
import { SoundTestProps } from '@/types'

import VoteGroup from './VoteGroup'

export function SoundTest({ soundTestInfo }: SoundTestProps) {
  const { data: soundTestAudio } = useSoundTestAudio(soundTestInfo.url)

  return (
    <div className="p-4">
      <h2>sound test - {soundTestInfo.sound_test_id}</h2>
      <div className="my-4 flex space-x-4">
        <VoteGroup
          totalVotes={soundTestInfo.total_votes}
          userVote={soundTestInfo?.userVote}
          soundTestId={soundTestInfo.sound_test_id}
        />
        <pre>{JSON.stringify(soundTestInfo, null, 2)}</pre>
      </div>
      {soundTestAudio && (
        <audio controls>
          <source src={soundTestAudio} type="audio/x-m4a" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  )
}
