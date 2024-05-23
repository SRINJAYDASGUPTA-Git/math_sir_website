'use client'
import React from 'react'
import Navbar from "@/components/shared/Navbar";
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { courseData } from '@/constants';

const Blog = () => {
  const {user} = useUser();
  if(!user){
    return <div>Sign in to view this page</div>
  }
  const courses:string[] = user.publicMetadata.courses as string[];
  console.log(courses)
  return (
    <section>
      <Navbar show={false} />
      <section className="h-full flex flex-col">
        <Image src="/bg.png" width={200} height={200} sizes="100vw" className="fixed -z-10 top-0 h-screen w-full bg-cover" alt="bg" />
        <div className='flex flex-col md:flex-row'>
          <div className='md:hidden flex justify-center place-item-center'>
            <Image src="/blog.png"
              alt='Blog'
              height={150}
              width={150}
            />
          </div>
          <div className='w-full md:w-1/2'>
            <p className='pt-5 md:pt-20 md:ps-24 ps-10 text-2xl md:text-6xl font-bold text-[#232323]'>
              Explore the Beauty of Math
            </p>
            <p className='w-[90%] md:w-[75%] ps-10 md:ps-24 pt-5 text-xl md:text-2xl text-black'>
              Explore math's wonders with insightful notes. From tips and tricks to deep dives, we make math engaging and accessible.
            </p>
          </div>
          <div className='hidden md:flex w-1/2 me-10 justify-end'>
            <Image src="/blog.png"
              alt='Blog'
              height={420}
              width={420}
            />
          </div>
        </div>
        <div className='flex-center w-full flex-col'>
          {
            courses.length >0 && (
              courses.map((course, index) => {
                const title = courseData.filter((data) => data.id === course).map((data) => data.title);
                return(
                <div key={index} className='w-[80%] h-fit p-5 md:p-10 bg-white rounded-xl mt-10'>
                  <p className='ps-10 text-xl md:text-4xl text-[#232323] font-bold'>{title}</p>
                </div>
              )})
            )
          }
          {/* <div className='w-full h-fit p-10 bg-white rounded-t-xl mt-10'>
            <p className='ps-10 text-4xl text-[#232323] font-bold'>Class IX (CBSE)</p>
          </div>
          <div className='w-full h-fit p-10 bg-white rounded-b-xl mb-10'>
            <p className='ps-10 text-4xl text-[#232323] font-bold'>Class IX (ICSE)</p>
          </div>
          <div className='w-full h-fit p-10 bg-white rounded-t-xl mt-10'>
            <p className='ps-10 text-4xl text-[#232323] font-bold'>Class X (CBSE)</p>
          </div>
          <div className='w-full h-fit p-10 bg-white rounded-b-xl mb-10'>
            <p className='ps-10 text-4xl text-[#232323] font-bold'>Class X (ICSE)</p>
          </div>
          <div className='w-full h-fit p-10 bg-white rounded-t-xl mt-10'>
            <p className='ps-10 text-4xl text-[#232323] font-bold'>Class XI (CBSE)</p>
          </div>
          <div className='w-full h-fit p-10 bg-white rounded-b-xl mb-10'>
            <p className='ps-10 text-4xl text-[#232323] font-bold'>Class XI (ICSE)</p>
          </div>
          <div className='w-full h-fit p-10 bg-white rounded-t-xl mt-10'>
            <p className='ps-10 text-4xl text-[#232323] font-bold'>Class XII (CBSE)</p>
          </div>
          <div className='w-full h-fit p-10 bg-white rounded-b-xl mb-10'>
            <p className='ps-10 text-4xl text-[#232323] font-bold'>Class XII (ICSE)</p>
          </div> */}
        </div>
      </section>
    </section>
  )
}

export default Blog