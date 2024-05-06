"use client"
import React from 'react'
import Navbar from "@/components/shared/Navbar";
import Form from '@/components/shared/Form';
import { useRouter } from 'next/navigation';

const Contact = () => {
  const router = useRouter();
  const handleMessage=({
    name,
    email,
    number,
    school,
    std,
    message
}:{
    name:string,
    email:string,
    number?:string,
    school?:string,
    std?:string,
    message?:string
})=>{
      console.log(name, email, number, school, std, message)
      router.push('/');     
  }
  return (
    <section>
      <Navbar show={false} />
      <Form type='contact' onSubmit={handleMessage}/>
    </section>
  )
}

export default Contact