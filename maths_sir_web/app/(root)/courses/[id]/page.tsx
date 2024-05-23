"use client";
import { Button } from "@/components/ui/button";
import { courseData } from "@/constants";
import { addCourseToUser } from "@/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Course = ({ params: { id } }: { params: { id: string } }) => {
  const { user } = useUser();
  const course = courseData.find((course) => course.id === id);
  const userEmail = user?.emailAddresses[0].emailAddress;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleEnroll = async () => {
    await addCourseToUser(userEmail!, course?.id!);
    const courses:string[] = user?.publicMetadata?.courses as string[] || [];
    const metadata = { userId: user?.id, courses: courses.concat(course?.id!) };
    try {
      setLoading(true);
      const response = await fetch("/api/publicMeta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });

      if (response) console.log(response);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
    router.push("/");
  };

  if (!user || !user.publicMetadata){
    setLoading(true);
    return <div className="w-full h-full flex-center">Loading....</div>;
  }

  return (
    <section>
      <Navbar show={false} />
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
        <Button
          className="bg-[#9747FF] w-fit text-xl p-4"
          onClick={handleEnroll}
          disabled={loading || (user.publicMetadata?.courses as string[])?.includes(course?.id!)}
        >
          {
            loading? "Enrolling...": (user.publicMetadata?.courses as string[])?.includes(course?.id!)?"Enrolled":"Enroll Now"
          }
        </Button>
      </div>
    </section>
  );
};

export default Course;
