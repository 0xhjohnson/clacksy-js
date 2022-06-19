import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import {
  FeaturedSoundTest,
  FeaturedSoundTestWithOptions,
  KeyboardOption,
  KeycapMaterial,
  KeyswitchOption,
  PlateMaterialOption,
} from '@/types'

async function getKeyboardOptions(keyboardID: string) {
  const { data, error } = await supabaseClient.rpc<KeyboardOption>(
    'get_keyboard_options',
    {
      correct_keyboard_id: keyboardID,
    }
  )
  if (error) {
    console.error('getKeyboardOptions: failed to fetch keyboard options')
    throw error
  }

  return data
}

async function getPlateMaterialOptions(plateMaterialID: string) {
  const { data, error } = await supabaseClient.rpc<PlateMaterialOption>(
    'get_plate_material_options',
    {
      correct_plate_material_id: plateMaterialID,
    }
  )
  if (error) {
    console.error(
      'getPlateMaterialOptions: failed to fetch plate material options'
    )
    throw error
  }

  return data
}

async function getKeyswitchOptions(keyswitchID: string) {
  const { data, error } = await supabaseClient.rpc<KeyswitchOption>(
    'get_keyswitch_options',
    {
      correct_keyswitch_id: keyswitchID,
    }
  )
  if (error) {
    console.error('getKeyswitchOptions: failed to fetch keyswitch options')
    throw error
  }

  return data
}

async function getKeycapMaterialOptions() {
  const { data, error } = await supabaseClient
    .from<KeycapMaterial>('keycap_material')
    .select('keycap_material_id, name')
  if (error) {
    console.error(
      'getKeycapMaterialOptions: failed to fetch keycap material options'
    )
    throw error
  }

  return data
}

async function getFeaturedSoundTestInfo(currentDate: string) {
  const { data, error } = await supabaseClient
    .from<FeaturedSoundTest>('sound_test')
    .select(
      `
    sound_test_id,
    url,
    uploaded,
    owner_id,
    keyboard_id,
    plate_material_id,
    keycap_material_id,
    keyswitch_id,
    featured_on
    `
    )
    .eq('featured_on', currentDate)
    .limit(1)
    .single()
  if (error) {
    console.error(
      'getFeaturedSoundTestInfo: failed to fetch featured sound test data'
    )
    throw error
  }

  return data
}

export async function getFeaturedSoundTest(currentDate: string) {
  let soundTestWithOptions: FeaturedSoundTestWithOptions

  // keyswitch_id, plate_material_id, and keyboard_id must be kept private since they correspond to the correct answers
  // they are only used for generating the options and should not be exposed to the client
  // safeSoundTestInfo represents "client safe" information
  const { keyswitch_id, plate_material_id, keyboard_id, ...safeSoundTestInfo } =
    await getFeaturedSoundTestInfo(currentDate)

  const [
    keycapMaterialOptions,
    keyswitchOptions,
    plateMaterialOptions,
    keyboardOptions,
  ] = await Promise.all([
    getKeycapMaterialOptions(),
    getKeyswitchOptions(keyswitch_id),
    getPlateMaterialOptions(plate_material_id),
    getKeyboardOptions(keyboard_id),
  ])

  soundTestWithOptions = {
    ...safeSoundTestInfo,
    options: {
      keycapMaterial: keycapMaterialOptions,
      keyswitch: keyswitchOptions,
      plateMaterial: plateMaterialOptions,
      keyboard: keyboardOptions,
    },
  }

  return soundTestWithOptions
}
