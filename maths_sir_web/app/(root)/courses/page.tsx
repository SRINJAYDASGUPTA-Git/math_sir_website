import CourseCard from "@/components/shared/CourseCard";
import React from "react";
import { courseData } from "@/constants";
const Courses = () => {
  return (
    <div className="flex flex-col w-full p-10 px-20 gap-10">
      <span className="text-5xl">Courses</span>
      <div className="flex-center w-full">
        <div className="flex-between flex-wrap gap-10 p-10 w-[80%]">
          {courseData.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              className="border-[20px] border-gray-200 rounded-3xl"
              classNameImg="rounded-xl w-[300px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
