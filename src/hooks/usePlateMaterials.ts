import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useQuery } from 'react-query'

import { PlateMaterial } from '@/types'

export async function getPlateMaterials() {
  const { data: plateMaterials, error } = await supabaseClient
    .from<PlateMaterial>('plate_material')
    .select('plate_material_id, name')
  if (error) {
    throw error
  }

  return plateMaterials
}

export default function usePlateMaterials() {
  return useQuery('plateMaterials', getPlateMaterials)
}
