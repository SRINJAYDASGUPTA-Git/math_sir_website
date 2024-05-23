import React from 'react'
import Navbar from "@/components/shared/Navbar";
import Image from 'next/image';

const Blog = () => {
  return (
    <section>
      <Navbar show={false} />
      <section className="h-full flex flex-col">
        <Image src="/bg.png" width={200} height={200} sizes="100vw" className="fixed -z-10 top-0 h-screen w-full bg-cover" alt="bg" />
        <div className='flex flex-col md:flex-row'>
          <div className='block md:hidden flex justify-center place-item-center'>
            <Image src="/blog.png"
              alt='Blog'
              height={250}
              width={250}
            />
          </div>
          <div className='w-full md:w-1/2'>
            <p className='pt-5 md:pt-20 md:ps-24 ps-10 text-3xl md:text-6xl font-bold text-[#232323]'>
              Explore the<br />Beauty of<br />Math
            </p>
            <p className='w-[90%] md:w-[75%] ps-10 md:ps-24 pt-5 text-xl md:text-2xl text-black'>
              Explore math's wonders with insightful notes. From tips and tricks to deep dives, we make math engaging and accessible.
            </p>
          </div>
          <div className='hidden md:block w-1/2 me-10 flex justify-end'>
            <Image src="/blog.png"
              alt='Blog'
              height={420}
              width={420}
            />
          </div>
        </div>
        <div>
          <div className='w-full h-fit p-10 bg-white rounded-t-xl mt-10'>
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
          </div>
        </div>
      </section>
    </section>
  )
}

export default Blog