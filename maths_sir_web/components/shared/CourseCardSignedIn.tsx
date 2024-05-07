import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCardSignedIn = ({
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
            <div className="p-1 bg-[#E3EDF8] rounded-xl mx-2 my-5">
                <p className="py-6 ms-2 text-xl font-bold">{title}</p>
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={500}
                    className={cn("bg-cover hover:border-[0.2rem] border-[#b378fe] rounded-xl transition duration-300", classNameImg)}
                />
            </div>
        </Link >
    );
};

export default CourseCardSignedIn;
