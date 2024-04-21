import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='p-5 md:px-20 flex flex-between gap-5'>
        <p className='w-1/2 md:w-fit text-[11px] md:text-[20px]'>
             <span className='font-bold'>&copy; Because of Maths 2024. </span><br/>All rights reserved &middot; <span className='underline'>Privacy Policy</span>
        </p>
        <div className='flex flex-col gap-5  md:w-fit text-[11px] md:text-[20px]'>
            <Link href='/contact' className='font-bold hover:underline'>Contact Us</Link>
            <p className='flex flex-col'>
                <span className="font-bold">Our Email</span>
                <a href="mailto:becauseofmaths@gmail.com">becauseofmaths@gmail.com</a>
            </p>
        </div>
    </footer>
  )
}

export default Footer