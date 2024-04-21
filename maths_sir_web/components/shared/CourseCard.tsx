import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({
  children,
  image,
  id,
  title,
  className,
  classNameImg,
  disableSlider,
}: {
  children?: React.ReactNode;
  image: string;
  id: string;
  title: string;
  className?: string;
  classNameImg?: string;
  disableSlider?: boolean;
}) => {
  return (
    <Link href={`/courses/${id}`} className={cn("group relative cursor-pointer", className)}>
      {children}
      <Image 
        src={image}
        alt={title}
        width={500}
        height={500}
        className={cn("bg-cover", classNameImg)}
      />
      <div className={cn("absolute bottom-0 left-0 right-0 bg-gray-200 p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200 ease-in-out", classNameImg, disableSlider ? "hidden":"")}>
        <span className="text-bold">{title}</span>
      </div>
    </Link >
  );
};

export default CourseCard;
