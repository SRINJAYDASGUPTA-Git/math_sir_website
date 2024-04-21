import CourseCard from "@/components/shared/CourseCard";
import React from "react";
import { courseData } from "@/constants";
const Courses = () => {
  return (
    <div className="flex flex-col w-full p-5 md:p-10 px-5 md:px-20 gap-5 md:gap-10">
      <span className="text-3xl md:text-5xl">Courses</span>
      <div className="flex-center w-full">
        <div className="flex-between flex-wrap gap-5 md:gap-10 p-5 md:p-10 w-[80%]">
          {courseData.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              className="border-[20px] border-gray-200 rounded-3xl"
              classNameImg="rounded-xl w-[300px]"
              disableSlider={true}
            >
              
                <span className=" w-full h-full flex-center bg-gray-200 text-xl md:text-3xl font-bold">{course.title}</span>
              
            </CourseCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
