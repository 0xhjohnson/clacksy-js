import { ChangeEvent, useState } from 'react'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { getUser } from '@supabase/supabase-auth-helpers/nextjs'
import { SoundTest } from '@/components/SoundTest'
import useSoundTests, { getSoundTests } from '@/hooks/useSoundTests'
import { SoundTestSort, SOUND_TEST_SORT_OPTIONS } from '@/types'
import { dehydrate, QueryClient } from 'react-query'
import { GetServerSidePropsContext } from 'next'

export default function Vote() {
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState<SoundTestSort>('latest')
  const { user } = useUser()

  const {
    isLoading,
    isError,
    error,
    data: soundTests,
    isFetching,
    isPreviousData,
  } = useSoundTests(sort, page, user?.id)

  const currentPage = page + 1
  const soundTestsPerPage = 10
  const hasMore =
    soundTests && soundTests[0].total_tests > currentPage * soundTestsPerPage

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'latest' || e.target.value === 'popular') {
      setSort(e.target.value)
    }
  }

  function handlePreviousPage() {
    setPage((old) => Math.max(old - 1, 0))
  }

  function handleNextPage() {
    if (!isPreviousData && hasMore) {
      setPage((old) => old + 1)
    }
  }

  return (
    <div>
      <h1>vote - vote for soundtest of the day</h1>
      <select value={sort} onChange={handleSortChange}>
        {SOUND_TEST_SORT_OPTIONS.map((sort) => (
          <option key={sort} value={sort}>
            {sort}
          </option>
        ))}
      </select>
      <p>current page: {currentPage}</p>
      <div className="flex">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          previous page
        </button>
        <button
          onClick={handleNextPage}
          disabled={isPreviousData || !hasMore}
          className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          next page
        </button>
      </div>
      {soundTests?.map((soundTestInfo) => (
        <SoundTest
          key={soundTestInfo.sound_test_id}
          soundTestInfo={soundTestInfo}
        />
      ))}
    </div>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { user } = await getUser(ctx)

  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=60'
  )

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 60,
      },
    },
  })
  const sort: SoundTestSort = 'latest'
  const page = 0

  await queryClient.prefetchQuery(['soundTests', sort, page], () =>
    getSoundTests(sort, page, user?.id)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
