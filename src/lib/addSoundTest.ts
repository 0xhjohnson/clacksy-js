import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import { AddSoundTest } from '@/types'

export async function addSoundTest({
  fileLocation,
  userID,
  keyboard,
  plateMaterial,
  keycapMaterial,
  keyswitch
}: AddSoundTest) {
  const { data, error } = await supabaseClient.from('sound_test').insert({
    url: fileLocation,
    uploaded: new Date().toISOString(),
    owner_id: userID,
    keyboard_id: keyboard,
    plate_material_id: plateMaterial,
    keycap_material_id: keycapMaterial,
    keyswitch_id: keyswitch
  })
  if (error) {
    throw error
  }

  return data
}
