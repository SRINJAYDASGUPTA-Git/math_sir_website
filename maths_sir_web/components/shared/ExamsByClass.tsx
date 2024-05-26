"use client";
import React, { useEffect, useState } from "react";
import { getExamScheduleByClass } from "@/utils";
import { Exam } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ExamsByClassProps {
  standardClass: string[];
}

const ExamsByClass: React.FC<ExamsByClassProps> = ({ standardClass }) => {
  const [upcomingExams, setUpcomingExams] = useState<Exam[] | null>(null);
  const [pastExams, setPastExams] = useState<Exam[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExams = async () => {
      const fetchedExams = await getExamScheduleByClass(
        standardClass,
        new Date()
      );
      setUpcomingExams(fetchedExams?.upcomingExams || null);
      setPastExams(fetchedExams?.pastExams || null);
      setLoading(false);
    };

    fetchExams();
  }, [standardClass]);

  if (loading) {
    return <div>Loading exams...</div>;
  }
  console.log(upcomingExams, pastExams);
  const pathname = usePathname();
  return (
    <div className="ml-5 gap-3">
      <h2 className={`${pathname === "/" ? "hidden" : ""}`}>Upcoming Exams</h2>
      {loading ? (
        <div>Loading...</div>
      ) : upcomingExams && upcomingExams.length ? (
        upcomingExams.map((exam, index) => (
          <Link
            href={`/exams/${exam.id}`}
            key={index}
            className="flex flex-col p-3 border border-black rounded-md w-full md:w-fit mt-2 text-[12px] md:text-base"
          >
            <h3>Exam Name: {exam.examName}</h3>
            <p>Class: {exam.class} </p>
            <p>Description: {exam.description}</p>
            <p>Total Marks: {exam.totalMarks}</p>
            <p>Date: {exam.date.toDate().toLocaleDateString()}</p>
          </Link>
        ))
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
            No upcoming exams scheduled for class {standardClass}
          </span>
        </div>
      )}
      <div className={`${pathname === "/" ? "hidden" : ""}`}>
        <h2>Past Exams</h2>
        {loading ? (
          <div>Loading...</div>
        ) : pastExams && pastExams.length ? (
          pastExams.map((exam, index) => (
            <Link
              href={`/exams/${exam.id}`}
              key={index}
              className="flex flex-col p-3 border border-black rounded-md w-fit ml-10 mt-5"
            >
              <h3>Exam Name: {exam.examName}</h3>
              <p>Description: {exam.description}</p>
              <p>Total Marks: {exam.totalMarks}</p>
              <p>Date: {exam.date.toDate().toLocaleDateString()}</p>
            </Link>
          ))
        ) : (
          <div className="flex-center flex-col gap-3 w-full">
            <Image
              src={"/not-found.svg"}
              width={100}
              height={100}
              alt="No courses subbed"
              className="md:w-[400px] md:h-[400px]"
            />
            <span className="text-[16px] md:text-2xl">
              No past exams for class {standardClass}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsByClass;
