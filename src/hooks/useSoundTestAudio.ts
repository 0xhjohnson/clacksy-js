import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useQuery } from 'react-query'

export async function getSoundTestAudio(fileUrl: string) {
  const [bucket, folder, filename] = fileUrl.split('/')

  const { data: soundTestAudio, error } = await supabaseClient.storage
    .from(bucket)
    .download(`${folder}/${filename}`)
  if (error) {
    throw error
  }

  let soundTestAudioURI = ''
  if (soundTestAudio) {
    soundTestAudioURI = URL.createObjectURL(soundTestAudio)
  }

  return soundTestAudioURI
}

export default function useSoundTestAudio(fileUrl: string) {
  return useQuery(
    ['soundTestAudio', fileUrl],
    () => getSoundTestAudio(fileUrl),
    {
      staleTime: Infinity,
      enabled: Boolean(fileUrl),
    }
  )
}
