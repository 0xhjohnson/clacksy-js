import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import { UploadSoundTestAudio } from '@/types'

export async function uploadSoundTestAudio({
  audioFile,
  ownerId
}: UploadSoundTestAudio) {
  const { data, error } = await supabaseClient.storage
    .from('sound-tests')
    .upload(`/${ownerId}/${audioFile.name}`, audioFile)
  if (error) {
    throw error
  }
  if (!data) {
    throw new Error('failed to upload audio')
  }

  return data
}
