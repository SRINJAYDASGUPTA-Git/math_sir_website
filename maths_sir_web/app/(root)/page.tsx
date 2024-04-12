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

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    <main className="bg-[url('/bg-signin.jpeg')] bg-cover py-5 h-[100vh]">
      {/*First Section with Motto and Slideshow*/}
      <section className="flex-between h-screen w-full p-20">
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
              className="w-full flex-center"
            >
              <CarouselContent>
                {slideImage.map((img) => (
                  <Image
                    key={img.url}
                    src={img.url}
                    width={500}
                    height={500}
                    sizes={"100vw"}
                    className="w-full"
                    alt={"slide"}
                  />
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
      {/*About Section*/}
      <section className=" group w-[90%] p-20 rounded-3xl flex flex-col gap-10">
          <span className="text-5xl mx-5 group-hover:underline">About</span>
      </section>
    </main>
  );
}
