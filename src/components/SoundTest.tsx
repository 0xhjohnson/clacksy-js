import useSoundTestAudio from '@/hooks/useSoundTestAudio'
import { SoundTestProps } from '@/types'

export function SoundTest({ soundTestInfo }: SoundTestProps) {
  const { data: soundTestAudio } = useSoundTestAudio(soundTestInfo.url)

  return (
    <div>
      <h2>sound test - {soundTestInfo.sound_test_id}</h2>
      <pre>{JSON.stringify(soundTestInfo, null, 2)}</pre>
      {soundTestAudio && (
        <audio controls>
          <source src={soundTestAudio} type="audio/x-m4a" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  )
}
