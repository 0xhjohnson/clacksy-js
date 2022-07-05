import { ContainerProps } from '@/types'

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  )
}
