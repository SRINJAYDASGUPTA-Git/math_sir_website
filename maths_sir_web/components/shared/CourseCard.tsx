import React from 'react'

const CourseCard = ({
    image, 
    id,
    title,
}:{
    image: string,
    id: string,
    title: string,
}) => {
  return (
    <div className=''>
      {title}
      <img src={image} alt={id} />
    </div>
  )
}

export default CourseCard