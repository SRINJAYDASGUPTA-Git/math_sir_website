"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "@/components/shared/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Autoplay from "embla-carousel-autoplay";
import { courseData, courseDataSignedIn, slideImage } from "@/constants";
import CourseCard from "@/components/shared/CourseCard";
import CourseCardSignedIn from "@/components/shared/CourseCardSignedIn";
import CourseCard_subed from "@/components/shared/CourseCard_subed";
import { addUsersToDB, getUserCourses } from "@/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import StudentDetails from "@/components/shared/StudentDetails";
import ExamsByClass from "@/components/shared/ExamsByClass";

export default function Home() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(true);
  const { user } = useUser();
  const [isAdmin, setisAdmin] = useState<boolean>(false);
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const [courses_subed, setCourses_subed] = useState<string[] | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (userEmail) {
        if (userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID) {
          setisAdmin(true);
        }
        const userCourses = await getUserCourses(userEmail);
        setCourses_subed(userCourses);
      }
    };
    fetchUserCourses();
  }, [user]);
console.log(courses_subed)
  const controlNavbar = useCallback(() => {
    const scrollThreshold = 300; // Define the scroll threshold here
    if (window.scrollY > scrollThreshold && window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    <main>
      <Navbar show={show} />
      <section className="py-5 h-full flex-center flex-col gap-10">
        <Image
          src="/bg.png"
          width={200}
          height={200}
          sizes="100vw"
          className="fixed -z-10 top-0 h-screen w-full bg-cover"
          alt="bg"
        />
        {/*First Section with Motto and Slideshow*/}
        <section className="flex flex-col p-3 md:p-10 md:flex-row items-center justify-between w-full gap-14 mt-[20%] md:mt-1">
          <div className={"w-full md:w-1/2 ps-5 flex items-start flex-col"}>
            <span className="text-xl md:text-4xl">Welcome to</span>
            <span className="text-3xl md:text-5xl font-medium">Because of</span>
            <span className="text-5xl md:text-[4.5rem] font-medium">Maths</span>
            <span className={"text-xl md:text-2xl md:block"}>
              Master math for boards & entrance
              <br /> exams with our comprehensive courses
              <br /> & expert guidance!
            </span>
            <Link href="/sign-in">
              <div className="mt-5 ms-2 w-fit flex items-center justify-center rounded-2xl p-1 px-5 text-black bg-[#FDD7BB] text-[20px] hover:scale-105">
                get Started
              </div>
            </Link>
          </div>
          {/*Image Carousel*/}
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
            className="w-full md:w-1/2 h-full rounded-3xl"
          >
            <CarouselContent>
              {slideImage.map((img) => (
                <CarouselItem key={img.url}>
                  <Image
                    src={img.url}
                    width={500}
                    height={500}
                    sizes="100vw"
                    alt={"slide"}
                    className="rounded-[2.2rem] w-full h-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* About Section */}
        <SignedOut>
          <section className="group w-[97%] p-4 md:p-14 mt-16 rounded-3xl flex flex-col gap-10 bg-[#FBFBFB]">
            <span className="text-3xl md:text-5xl md:mx-5 group-hover:underline">
              About
            </span>
            <div className="flex-between flex-col md:flex-row gap-10">
              <p className="w-full md:w-1/2 md:text-xl text-sm">
                Mr. Animesh Pradhan is a highly experienced mathematics teacher
                with over a decade of teaching experience. He holds a Master's
                degree in Applied Mathematics and is passionate about inspiring
                students to excel in math. Mr. Pradhan is known for his engaging
                teaching methods, personalized approach, and dedication to
                fostering a supportive learning environment. Throughout his
                career, he has successfully empowered numerous students to
                pursue further studies or careers in mathematics-related fields.
              </p>
              <div className="relative rounded-full bg-cover bg-no-repeat w-[200px] h-[200px] md:w-[300px] md:h-[300px] overflow-hidden items-center flex justify-center ">
                <Image
                  src="/about-bg.png"
                  alt="Background image"
                  fill={true}
                  className="absolute inset-0 z-0 group-hover:hidden"
                />
                <Image
                  src="/about-bg-1.jpeg"
                  alt="Background image"
                  fill={true}
                  className="absolute inset-0 z-0 hidden group-hover:block transition ease-in-out duration-500"
                />
                <Image
                  src="/sir_image.png"
                  width={300}
                  height={250}
                  alt="Animesh Pradhan"
                  className="absolute  group-hover:scale-105 transition ease-in-out duration-500"
                />
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section
            className="w-[100%] p-4 py-5 md:p-20 rounded-3xl flex flex-col gap-10 bg-[#FBFBFB]"
            id="#courses"
          >
            <div className="group w-full">
              <span className="text-3xl md:text-5xl mx-5 group-hover:underline">
                Explore Courses
              </span>
            </div>
            <div className="w-full p-5 flex-center">
              <Carousel
                opts={{
                  align: "end",
                }}
                className="w-[80%] justify-center items-center flex"
              >
                <CarouselContent>
                  {courseData.map((course) => (
                    <CarouselItem
                      key={course.id}
                      className="md:basis-1/2 lg:basis-1/4 flex place-items-end "
                    >
                      <CourseCard {...course}>
                        <span className="w-full h-full flex-center text-xl md:hidden">
                          {course.title}
                        </span>
                      </CourseCard>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>
        </SignedOut>
        <SignedIn>
          {isAdmin ? (
            <section className="w-full">
              <div className="w-full h-fit bg-white pt-5 px-10">
                {courseData.map((course) => {
                  return <StudentDetails key={course.id} course={course.id} />;
                })}
              </div>
            </section>
          ) : (
            <>
              <section className="w-full h-fit bg-white pt-5 px-10">
                <p className="p-2 md:p-7 text-2xl md:text-4xl font-bold text-[#232323]">
                  Upcoming Exams
                </p>
                <div className="w-full p-5 flex-center flex-wrap">
                  {courses_subed?.length ?? 0 > 0 ? (
                    <ExamsByClass standardClass={courses_subed ?? []} />
                  ) : (
                    <div className="flex-center flex-col gap-3">
                      <Image
                        src={"/not-found.svg"}
                        width={100}
                        height={100}
                        alt="No courses subbed"
                        className="md:w-[400px] md:h-[400px]"
                      />
                      <span className="text-[16px] md:text-2xl">
                        You have not enrolled in any course
                      </span>
                      <Button
                        className="rounded-full bg-white text-black border border-black hover:bg-white p-2 text-sm md:text-lg"
                        onClick={() => router.push("/courses")}
                      >
                        {" "}
                        Explore Courses
                      </Button>
                    </div>
                  )}
                </div>
              </section>

              <section className="w-full h-fit bg-white pt-5 px-10">
                <p className="p-2 md:p-7 text-2xl md:text-4xl font-bold text-[#232323]">
                  Your Courses
                </p>
                <div className="w-full p-5 flex-center flex-wrap">
                  {courses_subed?.length ?? 0 > 0 ? (
                    courses_subed?.map((course_sub: string) =>
                      courseDataSignedIn.map((course) => {
                        if (course.id === course_sub) {
                          console.log()
                          return (
                            <div
                              key={course.id}
                              className="md:basis-1/2 lg:basis-1/4 flex place-items-end"
                            >
                              <CourseCard_subed {...course}>
                                <span className="w-full h-full flex-center text-xl md:hidden">
                                  {course.title}
                                </span>
                              </CourseCard_subed>
                            </div>
                          );
                        }
                        else 
                          return null; //Return null for courses not found in both arrays
                      })
                    )
                  ) : (
                    <div className="flex-center flex-col gap-3">
                      <Image
                        src={"/not-found.svg"}
                        width={100}
                        height={100}
                        alt="No courses subbed"
                        className="md:w-[400px] md:h-[400px]"
                      />
                      <span className="text-[16px] md:text-2xl">
                        You have not enrolled in any course
                      </span>
                      <Button
                        className="rounded-full bg-white text-black border border-black hover:bg-white p-2 text-sm md:text-lg"
                        onClick={() => router.push("/courses")}
                      >
                        {" "}
                        Explore Courses
                      </Button>
                    </div>
                  )}
                </div>
              </section>

              <section className="w-full h-fit bg-white px-10 pt-5">
                <p className="p-2 md:p-7 text-2xl md:text-4xl font-bold text-[#232323]">
                  Other Courses
                </p>
                <div className="w-full p-5 flex-center flex-wrap">
                  {courseDataSignedIn.map((course) => {
                    return (
                      !courses_subed?.includes(course.id) &&  <div
                        key={course.id}
                        className="md:basis-1/2 lg:basis-1/4 flex place-items-end"
                      >
                        {
                          
                          <CourseCardSignedIn {...course} />
                        }
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </SignedIn>

        {/* Call to Action */}
        <section className="w-full flex flex-col gap-2">
          <p className="md:text-5xl text-2xl ms-10 mt-10">
            Join us for math
            <br />
            adventures. Together, let's
            <br />
            excel
          </p>
          <Link href="/sign-in">
            <div className="mt-5 ms-10 w-fit flex items-center justify-center rounded-2xl p-1 px-5 text-black bg-[#FDD7BB] text-xl">
              get Started
            </div>
          </Link>
        </section>
      </section>
    </main>
  );
}
