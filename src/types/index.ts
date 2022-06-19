export type UserInfo = {
  email: string
  password: string
}

export type FeaturedSoundTest = {
  sound_test_id: string
  url: string
  uploaded: string
  owner_id: string
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
  featured_on: string
  options: FeaturedOptions
}
