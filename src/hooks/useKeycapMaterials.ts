import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'

import { KeycapMaterial } from '@/types'

export async function getKeycapMaterials() {
  const { data: keycapMaterials, error } = await supabaseClient
    .from<KeycapMaterial>('keycap_material')
    .select('keycap_material_id, name')
  if (error) {
    throw error
  }

  return keycapMaterials
}

export default function useKeycapMaterials() {
  return useQuery('keycapMaterials', getKeycapMaterials)
}
