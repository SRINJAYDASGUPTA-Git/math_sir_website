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
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Autoplay from "embla-carousel-autoplay";
import { courseData, courseDataSignedIn, slideImage } from "@/constants";
import CourseCard from "@/components/shared/CourseCard";
import CourseCardSignedIn from "@/components/shared/CourseCardSignedIn";
import CourseCard_subed from "@/components/shared/CourseCard_subed";
import { getUserCourses } from "@/utils";

export default function Home() {
  const [show, setShow] = useState(true);
  const { user } = useUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const [courses_subed, setCourses_subed] = useState<string[] | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (userEmail) {
        const userCourses = await getUserCourses(userEmail);
        setCourses_subed(userCourses);
      }
    };

    fetchUserCourses();
  }, [userEmail]);

  const controlNavbar = useCallback(() => {
    const scrollThreshold = 300; // Define the scroll threshold here
    if (window.scrollY > scrollThreshold && window.scrollY > lastScrollY) {
      // if scroll down beyond the threshold hide the navbar
      setShow(false);
    } else {
      // if scroll up or not beyond the threshold show the navbar
      setShow(true);
    }
    // remember current page location to use in the next move
    setLastScrollY(window.scrollY);

    // if (typeof window !== "undefined") {
    //   if (window.scrollY > lastScrollY) {
    //     // if scroll down hide the navbar
    //     setShow(false);
    //   } else {
    //     // if scroll up show the navbar
    //     setShow(true);
    //   }
    //   // remember current page location to use in the next move
    //   setLastScrollY(window.scrollY);
    // }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
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
        <Image src="/bg.png" width={200} height={200} sizes="100vw" className="fixed -z-10 top-0 h-screen w-full bg-cover" alt="bg" />
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
              <div className="mt-5 ms-2 w-fit flex items-center justify-center rounded-2xl p-1 px-5 text-black bg-[#FDD7BB] text-[20px] hover:scale">
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
                Mr. Animesh Pradhan is a highly experienced mathematics teacher with
                over a decade of teaching experience. He holds a Master's degree in
                Applied Mathematics and is passionate about inspiring students to
                excel in math. Mr. Pradhan is known for his engaging teaching
                methods, personalized approach, and dedication to fostering a
                supportive learning environment. Throughout his career, he has
                successfully empowered numerous students to pursue further studies
                or careers in mathematics-related fields.
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
          <section className="w-[100%] p-4 py-5 md:p-20 rounded-3xl flex flex-col gap-10 bg-[#FBFBFB]" id="#courses">
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
                        <span className="w-full h-full flex-center text-xl md:hidden">{course.title}</span>
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
          <section className="w-full h-fit bg-white pt-5 px-10">
            <p className="p-7 text-4xl font-bold text-[#232323]">Your Courses</p>
            <div className="w-full p-5 flex-center flex-wrap">
              {courses_subed?.map((course_sub: string) => (
                courseDataSignedIn.map((course) => {
                  if (course.id === course_sub) {
                    return (
                      <div
                        key={course.id}
                        className="md:basis-1/2 lg:basis-1/4 flex place-items-end"
                      >
                        <CourseCard_subed {...course}>
                          <span className="w-full h-full flex-center text-xl md:hidden">{course.title}</span>
                        </CourseCard_subed>
                      </div>
                    );
                  }
                  return null; // Return null for courses not found in both arrays
                })
              ))}
            </div>
          </section>

          <section className="w-full h-fit bg-white px-10 pt-5">
            <p className="p-7 text-4xl font-bold text-[#232323]">Courses</p>
            <div className="w-full p-5 flex-center flex-wrap">
              {courseDataSignedIn.map((course) => (
                <div
                  key={course.id}
                  className="md:basis-1/2 lg:basis-1/4 flex place-items-end"
                >
                  <CourseCardSignedIn {...course}>
                    <span className="w-full h-full flex-center text-xl md:hidden">{course.title}</span>
                  </CourseCardSignedIn>
                </div>
              ))}
            </div>
          </section>
        </SignedIn>

        {/* Call to Action */}
        <section className="w-full flex flex-col gap-2">
          <p className="md:text-5xl text-4xl ms-10 mt-10">
            Join us for math<br />adventures. Together, let's<br />excel
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
