import { ChangeEvent, FormEvent, useState } from 'react'
import LoginForm from '../components/registration/LoginForm'
import Header from '../components/registration/Header'
import useSignUp from '../hooks/useSignUp'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signUpMutation = useSignUp({
    email,
    password,
  })

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    signUpMutation.mutate()
  }

  return (
    <div className="min-h-full flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Header
            title="Sign up for free account"
            subtitle={{ text: 'sign in to existing account', href: '/login' }}
          />
          <div className="mt-8">
            <LoginForm
              handleSubmit={handleSubmit}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              submitButtonText="Sign up"
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-pink-300 to-orange-100" />
      </div>
    </div>
  )
}
