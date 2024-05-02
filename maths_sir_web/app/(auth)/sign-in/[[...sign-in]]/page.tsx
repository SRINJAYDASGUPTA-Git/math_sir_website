import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex-center h-screen w-full bg-[url("/bg-signin.jpeg")] bg-cover bg-no-repeat  p-10 flex-col md:flex-row md:gap-10'>
        <div className='flex-center w-full md:w-[50%]'>
            <Image 
                src={'/logo.svg'}
                alt='Logo'
                width={150}
                height={0}
                className='p-3 md:w-[300px]'
            />
            <div className='flex flex-col gap-1 w-full '>
            <p className='text-3xl md:text-5xl'>
                Because of Maths
            </p>
            <p className='hidden md:block text-[24px]'>
            Master math for boards & entrance exams with our comprehensive courses & expert guidance!
            </p>
            </div>
        </div>
            <SignIn afterSignUpUrl={'/onboarding'} />
    </main>
  )
}

export default SignInPage