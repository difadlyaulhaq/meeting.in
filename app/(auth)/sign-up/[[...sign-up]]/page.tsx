import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <main className='flex items-center justify-center h-screen w-full'>
      <SignUp forceRedirectUrl="/dashboard" />
    </main>
  )
}

export default SignUpPage
