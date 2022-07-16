import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { InferGetStaticPropsType } from 'next'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

import Container from '@/components/Container'
import useSoundTestAudio from '@/hooks/useSoundTestAudio'
import { getFeaturedSoundTest } from '@/lib/getFeaturedSoundTest'
import { validateAnswer } from '@/lib/validateAnswer'
import { ValidateAnswer, ValidateAnswerResponse } from '@/types'

export default function Play({
  soundTest
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: soundTestAudio } = useSoundTestAudio(soundTest.url)
  const [gradedAnswers, setGradedAnswers] = useState<ValidateAnswerResponse>()

  const validateAnswerMutation = useMutation(
    (answer: ValidateAnswer) => validateAnswer(answer),
    {
      onSuccess: (data: ValidateAnswerResponse) => {
        toast.success('gg thanks for playing')
        setGradedAnswers(data)
      }
    }
  )

  const [keycapMaterial, setKeycapMaterial] = useState<string>()
  const [keyswitch, setKeyswitch] = useState<string>()
  const [plateMaterial, setPlateMaterial] = useState<string>()
  const [keyboard, setKeyboard] = useState<string>()

  const uploadedByUsername = soundTest.user_profile?.username ?? 'anonymous'
  const uploadDate = new Date(soundTest.uploaded).toISOString()
  const uploadDateFormatted = new Date(soundTest.uploaded).toLocaleDateString(
    undefined,
    {
      dateStyle: 'long'
    }
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!keycapMaterial || !plateMaterial || !keyboard || !keyswitch) {
      return toast.error('save error: missing required information')
    }

    validateAnswerMutation.mutate({
      keycapMaterial,
      plateMaterial,
      keyboard,
      keyswitch
    })
  }

  return (
    <Container>
      <div className="grid grid-cols-1 border-b border-gray-200 pb-5 md:grid-cols-2">
        <h1 className="text-2xl font-bold text-gray-900">
          play &mdash; sound of the day
        </h1>
        <p className="mt-3 text-sm font-medium text-gray-500 md:text-right">
          Uploaded by{' '}
          <span className="text-gray-900">{uploadedByUsername}</span> on{' '}
          <time dateTime={uploadDate}>{uploadDateFormatted}</time>
        </p>
      </div>
      {soundTestAudio && (
        <audio controls className="mt-8 sm:mt-12">
          <source src={soundTestAudio} type="audio/x-m4a" />
          Your browser does not support the audio tag.
        </audio>
      )}
      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
        <div>
          <div className="flex justify-between">
            <h2 className="text-sm font-medium text-gray-900">
              KEYCAP MATERIAL
            </h2>
            <div
              className={clsx(
                gradedAnswers?.keycap_material_id ? 'inline' : 'hidden'
              )}
            >
              {gradedAnswers?.keycap_material_id?.isCorrect ? (
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-rose-500" />
              )}
            </div>
          </div>
          <RadioGroup
            value={keycapMaterial}
            onChange={setKeycapMaterial}
            className="mt-2"
            disabled={
              validateAnswerMutation.isLoading ||
              validateAnswerMutation.isSuccess
            }
          >
            <RadioGroup.Label className="sr-only">
              Choose a keycap material
            </RadioGroup.Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {soundTest.options.keycapMaterial.map(
                ({ keycap_material_id, name }) => (
                  <RadioGroup.Option
                    key={keycap_material_id}
                    value={keycap_material_id}
                    className={({ active, checked, disabled }) =>
                      clsx(
                        active ? 'ring-2 ring-pink-500 ring-offset-2' : '',
                        checked
                          ? 'border-transparent bg-pink-600 text-white hover:bg-pink-700'
                          : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        gradedAnswers?.keycap_material_id?.correctAnswer ===
                          keycap_material_id &&
                          'ring-2 ring-emerald-500 ring-offset-2',
                        'flex items-center justify-center rounded-md border p-3 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                      )
                    }
                  >
                    <RadioGroup.Label as="span">{name}</RadioGroup.Label>
                  </RadioGroup.Option>
                )
              )}
            </div>
          </RadioGroup>
        </div>

        <div>
          <div className="flex justify-between">
            <h2 className="text-sm font-medium text-gray-900">
              PLATE MATERIAL
            </h2>
            <div
              className={clsx(
                gradedAnswers?.plate_material_id ? 'inline' : 'hidden'
              )}
            >
              {gradedAnswers?.plate_material_id?.isCorrect ? (
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-rose-500" />
              )}
            </div>
          </div>
          <RadioGroup
            value={plateMaterial}
            onChange={setPlateMaterial}
            className="mt-2"
            disabled={
              validateAnswerMutation.isLoading ||
              validateAnswerMutation.isSuccess
            }
          >
            <RadioGroup.Label className="sr-only">
              Choose a plate material
            </RadioGroup.Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {soundTest.options.plateMaterial.map(
                ({ plate_material_id, plate_material_name }) => (
                  <RadioGroup.Option
                    key={plate_material_id}
                    value={plate_material_id}
                    className={({ active, checked, disabled }) =>
                      clsx(
                        active ? 'ring-2 ring-pink-500 ring-offset-2' : '',
                        checked
                          ? 'border-transparent bg-pink-600 text-white hover:bg-pink-700'
                          : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                        gradedAnswers?.plate_material_id?.correctAnswer ===
                          plate_material_id &&
                          'ring-2 ring-emerald-500 ring-offset-2',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        'flex items-center justify-center rounded-md border p-3 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                      )
                    }
                  >
                    <RadioGroup.Label as="span">
                      {plate_material_name}
                    </RadioGroup.Label>
                  </RadioGroup.Option>
                )
              )}
            </div>
          </RadioGroup>
        </div>

        <div>
          <div className="flex justify-between">
            <h2 className="text-sm font-medium text-gray-900">KEYBOARD</h2>
            <div
              className={clsx(gradedAnswers?.keyboard_id ? 'inline' : 'hidden')}
            >
              {gradedAnswers?.keyboard_id?.isCorrect ? (
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-rose-500" />
              )}
            </div>
          </div>
          <RadioGroup
            value={keyboard}
            onChange={setKeyboard}
            className="mt-2"
            disabled={
              validateAnswerMutation.isLoading ||
              validateAnswerMutation.isSuccess
            }
          >
            <RadioGroup.Label className="sr-only">
              Choose a keyboard
            </RadioGroup.Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {soundTest.options.keyboard.map(
                ({ keyboard_id, keyboard_name }) => (
                  <RadioGroup.Option
                    key={keyboard_id}
                    value={keyboard_id}
                    className={({ active, checked, disabled }) =>
                      clsx(
                        active ? 'ring-2 ring-pink-500 ring-offset-2' : '',
                        checked
                          ? 'border-transparent bg-pink-600 text-white hover:bg-pink-700'
                          : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                        gradedAnswers?.keyboard_id?.correctAnswer ===
                          keyboard_id &&
                          'ring-2 ring-emerald-500 ring-offset-2',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        'flex items-center justify-center rounded-md border p-3 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                      )
                    }
                  >
                    <RadioGroup.Label as="span">
                      {keyboard_name}
                    </RadioGroup.Label>
                  </RadioGroup.Option>
                )
              )}
            </div>
          </RadioGroup>
        </div>

        <div>
          <div className="flex justify-between">
            <h2 className="text-sm font-medium text-gray-900">KEYSWITCH</h2>
            <div
              className={clsx(
                gradedAnswers?.keyswitch_id ? 'inline' : 'hidden'
              )}
            >
              {gradedAnswers?.keyswitch_id?.isCorrect ? (
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-rose-500" />
              )}
            </div>
          </div>
          <RadioGroup
            value={keyswitch}
            onChange={setKeyswitch}
            className="mt-2"
            disabled={
              validateAnswerMutation.isLoading ||
              validateAnswerMutation.isSuccess
            }
          >
            <RadioGroup.Label className="sr-only">
              Choose a keyswitch
            </RadioGroup.Label>
            <div className="relative -space-y-px rounded-md bg-white">
              {soundTest.options.keyswitch.map(
                (
                  { keyswitch_id, keyswitch_name, keyswitch_type_name },
                  idx
                ) => (
                  <RadioGroup.Option
                    key={keyswitch_id}
                    value={keyswitch_id}
                    className={({ checked, disabled }) =>
                      clsx(
                        idx === 0 ? 'rounded-t-md' : '',
                        idx === soundTest.options.keyswitch.length - 1
                          ? 'rounded-b-md'
                          : '',
                        checked
                          ? 'z-10 border-pink-200 bg-pink-50'
                          : 'border-gray-200',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        'relative flex flex-col border p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6'
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <span className="flex items-center text-sm">
                          <span
                            className={clsx(
                              checked
                                ? 'border-transparent bg-pink-600'
                                : 'border-gray-300 bg-white',
                              active
                                ? 'ring-2 ring-pink-500 ring-offset-2'
                                : '',
                              gradedAnswers?.keyswitch_id?.correctAnswer ===
                                keyswitch_id &&
                                'ring-2 ring-emerald-500 ring-offset-2',
                              'flex h-4 w-4 items-center justify-center rounded-full border'
                            )}
                            aria-hidden="true"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          </span>
                          <RadioGroup.Label
                            as="span"
                            className={clsx(
                              checked ? 'text-pink-900' : 'text-gray-900',
                              'ml-3 font-medium'
                            )}
                          >
                            {keyswitch_name}
                          </RadioGroup.Label>
                        </span>
                        <span
                          className={clsx(
                            checked ? 'text-pink-700' : 'text-gray-500',
                            'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                          )}
                        >
                          {keyswitch_type_name}
                        </span>
                      </>
                    )}
                  </RadioGroup.Option>
                )
              )}
            </div>
          </RadioGroup>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-600"
              disabled={
                validateAnswerMutation.isLoading ||
                validateAnswerMutation.isSuccess
              }
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Container>
  )
}

export async function getStaticProps() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'UTC'
  })
  const soundTest = await getFeaturedSoundTest(currentDate)

  return {
    props: {
      soundTest
    },
    revalidate: 5 * 60
  }
}
