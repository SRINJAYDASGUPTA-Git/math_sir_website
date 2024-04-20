"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { courseData, slideImage } from "@/constants";
import CourseCard from "@/components/shared/CourseCard";

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    <main className="py-5 h-full flex-center flex-col p-3 md:p-10 gap-10">
      <Image src="/bg.png" width={200} height={200} sizes="100vw" className="fixed -z-10 top-0 h-screen w-full bg-cover" alt="bg"/>
      {/*First Section with Motto and Slideshow*/}
      <section className="flex flex-col md:flex-row items-center justify-between w-full gap-14 mt-[20%] md:mt-1">
        <div className={"w-full md:w-1/2 ps-5 flex items-start flex-col"}>
          <span className="text-xl md:text-4xl">Welcome to</span>
          <span className="text-3xl md:text-5xl font-medium">Because of</span>
          <span className="text-5xl md:text-[4.5rem] font-medium">Maths</span>
          <span className={"text-xl md:text-2xl md:block"}>
            Master math for boards & entrance
            <br /> exams with our comprehensive courses
            <br /> & expert guidance!
          </span>
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
      <section className="group w-[100%] p-4 md:p-14 mt-16 rounded-3xl flex flex-col gap-10 bg-[#FBFBFB]">
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
                  <CourseCard {...course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full flex flex-col gap-2">
        <p className="md:w-[30%] md:text-5xl text-4xl p-10">
          Join us for math adventures. Together, let's excel
        </p>
        <div className="ml-10 w-fit flex items-center justify-center font-bold rounded-xl p-1 px-4 bg-[#FDD7BB] text-xl md:text-3xl">
          Get Started
        </div>
      </section>

    </main>
  );
}
