import { courseData } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Course = ({params:{id}}:{params:{id:string}}) => {
    const course = courseData.find(course => course.id === id)
  return (
    <div className='w-full flex flex-col p-20 gap-10'>
      <span>
        <h1 className='text-3xl font-bold'>{course?.title}</h1>
      </span>
      <div className='w-full flex-between'>
        <p  className='w-[1/4] text-lg'>{course?.description}</p>
        <Image 
          src={course?.image!}
          alt={course?.title!}
          width={400}
          height={300}
          className='w-[1/2]'
        />
      </div>
    </div>
  )
}

export default Course