'use client'
import Form from '@/components/shared/Form'

const page = () => {
  const onSubmit = () => {
    console.log('contact')
  }
  return (
    <Form 
      type='contact'
      onSubmit={onSubmit} // Fix: Pass the onSubmit function as a prop
    />
  )
}

export default page