import { Combobox } from '@headlessui/react'
import { UploadIcon } from '@heroicons/react/outline'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import clsx from 'clsx'
import { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'

import Container from '@/components/Container'
import useKeyboards from '@/hooks/useKeyboards'
import useKeycapMaterials from '@/hooks/useKeycapMaterials'
import usePlateMaterials from '@/hooks/usePlateMaterials'
import useSwitches from '@/hooks/useSwitches'
import { addSoundTest } from '@/lib/addSoundTest'
import { uploadSoundTestAudio } from '@/lib/uploadSoundTestAudio'
import {
  AddSoundTest,
  Keyboard,
  KeycapMaterial,
  Keyswitch,
  PlateMaterial,
  UploadSoundTestAudio
} from '@/types'

const DEBOUNCE_TIME_IN_MS = 280

export default function New() {
  const { user } = useUser()

  const [fileLocation, setFileLocation] = useState<string>()
  const uploadMutation = useMutation(
    (uploadData: UploadSoundTestAudio) => uploadSoundTestAudio(uploadData),
    {
      onSuccess: (data) => {
        setFileLocation(data.Key)
        toast.success('sound test audio uploaded')
      }
    }
  )
  const addSoundTestMutation = useMutation(
    (soundTestInfo: AddSoundTest) => addSoundTest(soundTestInfo),
    {
      onSuccess: () => {
        toast.success('sound test saved')
      }
    }
  )

  const [keyboard, setKeyboard] = useState<Keyboard>()
  const [keyboardSearchTerm, setKeyboardSearchTerm] = useState('')
  const debouncedKeyboardSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setKeyboardSearchTerm(event.target.value)
    },
    DEBOUNCE_TIME_IN_MS
  )

  const [keyswitch, setKeyswitch] = useState<Keyswitch>()
  const [switchSearchTerm, setSwitchSearchTerm] = useState('')
  const debouncedSwitchSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSwitchSearchTerm(event.target.value)
    },
    DEBOUNCE_TIME_IN_MS
  )

  const [plateMaterial, setPlateMaterial] =
    useState<PlateMaterial['plate_material_id']>('')
  const [keycapMaterial, setKeycapMaterial] =
    useState<KeycapMaterial['keycap_material_id']>('')

  const { data: keyboards = [] } = useKeyboards(keyboardSearchTerm)
  const { data: switches = [] } = useSwitches(switchSearchTerm)
  const { data: plateMaterials = [] } = usePlateMaterials()
  const { data: keycapMaterials = [] } = useKeycapMaterials()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user?.id) {
      return toast.error('save error: must have an account to upload')
    }
    if (!fileLocation || !keyboard || !keyswitch) {
      return toast.error('save error: missing required information')
    }

    addSoundTestMutation.mutate({
      fileLocation,
      userID: user?.id,
      keyboard: keyboard?.keyboard_id,
      plateMaterial,
      keycapMaterial,
      keyswitch: keyswitch?.keyswitch_id
    })
  }

  function handleAudioUpload(event: ChangeEvent<HTMLInputElement>) {
    const audioFile = event.target.files?.length && event.target.files[0]

    if (!user?.id) {
      return toast.error('upload error: must have an account to upload')
    }
    if (!audioFile) {
      return toast.error('upload error: no audio file specified')
    }

    const fileSizeInMB = audioFile.size / 1024 ** 2
    if (fileSizeInMB > 1) {
      return toast.error('upload error: max file size is 1MB')
    }

    uploadMutation.mutate({
      ownerId: user?.id,
      audioFile
    })
  }

  return (
    <Container>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Sound test info
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <Combobox
                as="div"
                value={keyboard}
                onChange={setKeyboard}
                className="sm:col-span-3"
              >
                <Combobox.Label className="block text-sm font-medium text-gray-700">
                  Keyboard
                </Combobox.Label>
                <div className="relative mt-1">
                  <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                    onChange={debouncedKeyboardSearch}
                    displayValue={(keeb: Keyboard) => keeb?.name}
                    required
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {keyboards.map((keeb) => (
                      <Combobox.Option
                        key={keeb.keyboard_id}
                        value={keeb}
                        className={({ active }) =>
                          clsx(
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                            active ? 'bg-pink-600 text-white' : 'text-gray-900'
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={clsx(
                                'block truncate',
                                selected && 'font-semibold'
                              )}
                            >
                              {keeb.name}
                            </span>

                            {selected && (
                              <span
                                className={clsx(
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                  active ? 'text-white' : 'text-pink-600'
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>

              <Combobox
                as="div"
                value={keyswitch}
                onChange={setKeyswitch}
                className="sm:col-span-3"
              >
                <Combobox.Label className="block text-sm font-medium text-gray-700">
                  Switches
                </Combobox.Label>
                <div className="relative mt-1">
                  <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                    onChange={debouncedSwitchSearch}
                    displayValue={(keyswitch: Keyswitch) => keyswitch?.name}
                    required
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {switches.map((keyswitch) => (
                      <Combobox.Option
                        key={keyswitch.keyswitch_id}
                        value={keyswitch}
                        className={({ active }) =>
                          clsx(
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                            active ? 'bg-pink-600 text-white' : 'text-gray-900'
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <div className="flex">
                              <span
                                className={clsx(
                                  'truncate',
                                  selected && 'font-semibold'
                                )}
                              >
                                {keyswitch.name}
                              </span>
                              <span
                                className={clsx(
                                  'ml-2 truncate text-gray-500',
                                  active ? 'text-pink-200' : 'text-gray-500'
                                )}
                              >
                                {keyswitch.keyswitch_type.name}
                              </span>
                            </div>
                            {selected && (
                              <span
                                className={clsx(
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                  active ? 'text-white' : 'text-pink-600'
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>

              <div className="sm:col-span-3">
                <label
                  htmlFor="plate-material"
                  className="block text-sm font-medium text-gray-700"
                >
                  Plate material
                </label>
                <div className="mt-1">
                  <select
                    id="plate-material"
                    value={plateMaterial}
                    onChange={(e) => setPlateMaterial(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    required
                  >
                    {!plateMaterial && <option value="" disabled></option>}
                    {plateMaterials.map((material) => (
                      <option
                        key={material.plate_material_id}
                        value={material.plate_material_id}
                      >
                        {material.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="keycap-material"
                  className="block text-sm font-medium text-gray-700"
                >
                  Keycap material
                </label>
                <div className="mt-1">
                  <select
                    id="keycap-material"
                    value={keycapMaterial}
                    onChange={(e) => setKeycapMaterial(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    required
                  >
                    {!keycapMaterial && <option value="" disabled></option>}
                    {keycapMaterials.map((material) => (
                      <option
                        key={material.keycap_material_id}
                        value={material.keycap_material_id}
                      >
                        {material.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="sound-test"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sound test
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto h-10 w-10 text-gray-400" />
                    <label
                      htmlFor="audio-upload"
                      className="relative cursor-pointer rounded-md bg-white text-sm font-medium text-pink-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:text-pink-500"
                    >
                      <span>
                        {fileLocation
                          ? fileLocation.split('/').at(-1)
                          : 'Upload an audio file'}
                      </span>
                      <input
                        id="audio-upload"
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="text-xs text-gray-500">
                      MP3, MP4, M4A, AAC up to 1MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Container>
  )
}
