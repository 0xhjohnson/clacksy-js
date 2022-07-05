import Link from 'next/link'

type Subtitle = {
  text: string
  href: string
}

type HeaderProps = {
  title: string
  subtitle: Subtitle
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div>
      <div className="h-8 w-8 rounded-full bg-gray-300" />
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">
        Or{' '}
        <Link href={subtitle.href}>
          <a className="font-medium text-pink-600 hover:text-pink-500">
            {subtitle.text}
          </a>
        </Link>
      </p>
    </div>
  )
}
