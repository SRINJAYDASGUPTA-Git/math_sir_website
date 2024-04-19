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
import { slideImage } from "@/constants";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    <main className="bg-[url('/bg-signin.jpeg')] bg-cover py-5 h-full flex-center flex-col p-5 gap-10">
      {/*First Section with Motto and Slideshow*/}
      <section className="flex-between w-full p-20 mt-">
        <div className="flex items-center justify-between w-full">
          <div className={"w-1/2 flex items-start flex-col"}>
            <span className="text-5xl">Because Of</span>
            <span className="text-7xl">Maths</span>
            <span className={"text-3xl"}>
              Master math for boards & entrance
              <br /> exams with our comprehensive courses
              <br /> & expert guidance!
            </span>
          </div>
          {/*Image Carousel*/}
          <div className="flex-center w-1/2 bg-transparent rounded-3xl h-[500px]">
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.play}
              className="w-full flex-center h-[500px] bg-transparent rounded-3xl"
            >
              <CarouselContent>
                {slideImage.map((img) => (
                  <CarouselItem key={img.url} className="flex-center">
                    <Image
                      src={img.url}
                      width={500}
                      height={500}
                      alt={"slide"}
                      className="rounded-3xl w-[80%]"
                      style={{ objectFit: "cover" }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className=" group w-[100%] p-20 rounded-3xl flex flex-col gap-10 bg-white">
        <span className="text-5xl mx-5 group-hover:underline">About</span>
        <div className="flex-between ">
          <p className="w-1/2 text-2xl">
            Mr. Animesh Pradhan is a highly experienced mathematics teacher with
            over a decade of teaching experience. He holds a Master's degree in
            Applied Mathematics and is passionate about inspiring students to
            excel in math. Mr. Pradhan is known for his engaging teaching
            methods, personalized approach, and dedication to fostering a
            supportive learning environment. Throughout his career, he has
            successfully empowered numerous students to pursue further studies
            or careers in mathematics-related fields.
          </p>
          <div className="relative rounded-full bg-cover bg-no-repeat w-[450px] h-[450px] overflow-hidden items-center flex justify-center ">
            <Image
              src="/about-bg.png"
              alt="Background image"
              layout="fill"
              className="absolute inset-0 z-0 group-hover:hidden"
            />
            <Image
              src="/about-bg-1.jpeg"
              alt="Background image"
              layout="fill"
              className="absolute inset-0 z-0 hidden group-hover:block transition ease-in-out duration-500"
            />
            <Image
              src="/sir_image.png"
              width={500}
              height={400}
              alt="Animesh Pradhan"
              className="absolute z-10 group-hover:scale-105 transition ease-in-out duration-500"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section>
        
      </section>
    </main>
  );
}
