import LoginForm from '../components/registration/LoginForm'
import Header from '../components/registration/Header'

export default function Signup() {
  return (
    <div className="min-h-full flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Header
            title="Sign up for free account"
            subtitle={{ text: 'sign in to existing account', href: '/login' }}
          />
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-pink-300 to-orange-100" />
      </div>
    </div>
  )
}
