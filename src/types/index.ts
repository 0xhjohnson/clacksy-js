import { ReactNode } from 'react'

export type UserInfo = {
  email: string
  password: string
}

export type FeaturedSoundTest = {
  sound_test_id: string
  url: string
  uploaded: string
  owner_id: string
  user_profile: {
    username: string | null
  }
  keyboard_id: string
  plate_material_id: string
  keycap_material_id: string
  keyswitch_id: string
  featured_on: string
}

export type KeycapMaterial = {
  keycap_material_id: string
  name: string
}

export type KeyswitchOption = {
  keyswitch_id: string
  keyswitch_name: string
  keyswitch_type_name: string
}

export type PlateMaterialOption = {
  plate_material_id: string
  plate_material_name: string
}

export type KeyboardOption = {
  keyboard_id: string
  keyboard_name: string
}

type FeaturedOptions = {
  keycapMaterial: KeycapMaterial[]
  keyswitch: KeyswitchOption[]
  plateMaterial: PlateMaterialOption[]
  keyboard: KeyboardOption[]
}

export type FeaturedSoundTestWithOptions = {
  sound_test_id: string
  url: string
  uploaded: string
  owner_id: string
  user_profile: {
    username: string | null
  }
  featured_on: string
  options: FeaturedOptions
}

export const SOUND_TEST_SORT_OPTIONS = ['popular', 'latest'] as const
export type SoundTestSort = typeof SOUND_TEST_SORT_OPTIONS[number]

export const VOTE_TYPES = {
  Downvote: -1,
  Default: 0,
  Upvote: 1
} as const
export type VoteType = typeof VOTE_TYPES[keyof typeof VOTE_TYPES]

export type SoundTest = {
  sound_test_id: string
  url: string
  uploaded: string
  last_updated: string
  username: string
  total_votes: number
  total_tests: number
  userVote?: VoteType
}

export type SoundTestProps = {
  soundTestInfo: SoundTest
}

export type VoteGroupProps = {
  totalVotes: number
  userVote?: VoteType
  soundTestId: SoundTest['sound_test_id']
}

export type UserVote = {
  sound_test_id: string
  owner_id: string
  vote_type: VoteType
  created_at: string
}

export type UpsertVote = {
  soundTestId: SoundTest['sound_test_id']
  ownerId?: UserVote['owner_id'] | undefined
  voteType: VoteType
}

export type ContainerProps = {
  children: ReactNode
}

export type Keyboard = {
  keyboard_id: string
  name: string
}

export type KeyswitchType = {
  name: string
}

export type Keyswitch = {
  keyswitch_id: string
  name: string
  keyswitch_type: KeyswitchType
}

export type PlateMaterial = {
  plate_material_id: string
  name: string
}

export type UploadSoundTestAudio = {
  audioFile: File
  ownerId: string
}

export type AddSoundTest = {
  fileLocation: string
  userID: string
  keyboard: string
  plateMaterial: string
  keycapMaterial: string
  keyswitch: string
}
