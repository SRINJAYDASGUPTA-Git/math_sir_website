import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full flex-center p-10'>
      <UserProfile />
    </div>
  )
}

export default page