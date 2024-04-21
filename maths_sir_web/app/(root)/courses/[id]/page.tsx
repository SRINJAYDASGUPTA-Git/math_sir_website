"use client"
import { Button } from "@/components/ui/button";
import { courseData } from "@/constants";
import { addCourseToUser } from "@/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Course = ({ params: { id } }: { params: { id: string } }) => {
  const { user } = useUser();
  const course = courseData.find((course) => course.id === id);
  const userEmail = user?.emailAddresses[0].emailAddress;
  const router = useRouter();
  const handleEnroll = async() => {
    await addCourseToUser(userEmail!, course?.id!);
    router.push('/')
  };

  if(!user)
    return <div className="w-full h-full flex-center">Loading....</div>

  return (
    <div className="w-full flex flex-col p-10 gap-10 bg-[#E3EDF8]">
      <span>
        <h1 className="text-xl md:text-3xl font-bold">{course?.title}</h1>
      </span>
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between">
        <p className="w-full md:w-1/2 md:text-2xl">{course?.description}</p>
        <div className="w-full md:w-1/2 p-5 flex-center">
          <Image
            src={course?.image!}
            alt={course?.title!}
            width={400}
            height={300}
            className="w-[1/2]"
          />
        </div>
      </div>
      <Button className="bg-[#9747FF] w-fit text-xl p-4" onClick={handleEnroll}>
        Enroll Now
      </Button>
    </div>
  );
};

export default Course;
