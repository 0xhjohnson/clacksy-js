import '@/styles/globals.css'

import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export { reportWebVitals } from 'next-axiom'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserProvider supabaseClient={supabaseClient}>
            <Component {...pageProps} />
            <Toaster />
            <ReactQueryDevtools />
          </UserProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
