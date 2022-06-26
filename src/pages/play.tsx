import { InferGetStaticPropsType } from 'next'
import useSoundTestAudio from '@/hooks/useSoundTestAudio'
import { getFeaturedSoundTest } from '@/lib/getFeaturedSoundTest'

export default function Play({
  soundTest,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: soundTestAudio } = useSoundTestAudio(soundTest.url)

  return (
    <div>
      <h1>play game - sound of the day</h1>
      <pre>{JSON.stringify(soundTest, null, 2)}</pre>
      {soundTestAudio && (
        <audio controls>
          <source src={soundTestAudio} type="audio/x-m4a" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'UTC',
  })
  const soundTest = await getFeaturedSoundTest(currentDate)

  return {
    props: {
      soundTest,
    },
    revalidate: 5 * 60,
  }
}
