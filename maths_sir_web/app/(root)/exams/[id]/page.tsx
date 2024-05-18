"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import { useRouter } from "next/navigation";
import React from "react";

const Exam = ({ params: { id } }: { params: { id: string } }) => {
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0].emailAddress;

  if (!user)
    return <div className="w-full h-full flex-center">Loading....</div>

  return (
    <section>
      <Navbar show={false} />
      Exams
    </section>
  );
};

export default Exam;
