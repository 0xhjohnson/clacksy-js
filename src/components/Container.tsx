import { ContainerProps } from '@/types'

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  )
}
