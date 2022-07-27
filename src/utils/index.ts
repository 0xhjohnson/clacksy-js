import { ApiError } from '@supabase/supabase-js'

export function isSupabaseError(value: any): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    'status' in value
  )
}
