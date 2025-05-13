import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className='flex justify-center'>
      <SignIn forceRedirectUrl={"/"} />
    </div>
  )
}

export default SignInPage