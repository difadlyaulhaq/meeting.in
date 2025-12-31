import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <main className='flex items-center justify-center h-screen w-full'>
      <SignIn forceRedirectUrl="/dashboard" />
    </main>
  )
}

export default SignInPage