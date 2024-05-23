import { Exam, getExamSchedule } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AllExams = () => {
  const [upcomingExams, setUpcomingExams] = useState<Exam[] | null>(null);
  const [pastExams, setPastExams] = useState<Exam[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchExams = async () => {
      const fetchedExams = await getExamSchedule(new Date());
      setUpcomingExams(fetchedExams?.upcomingExams || null);
      setPastExams(fetchedExams?.pastExams || null);
      setLoading(false);
    };

    fetchExams();
  }, [upcomingExams, pastExams]);
  return (
    <div className="ml-5">
      <h2>Upcoming Exams</h2>
      {loading ? (
        <div>Loading...</div>
      ) : upcomingExams && upcomingExams.length ? (
        upcomingExams.map((exam, index) => (
          <Link
            href={`/exams/${exam.id}`}
            key={index}
            className="flex flex-col p-3 border border-black rounded-md w-fit ml-10 mt-5"
          >
            <h3>Exam Name: {exam.examName}</h3>
            <p>Class: {exam.class} </p>
            <p>Description: {exam.description}</p>
            <p>Total Marks: {exam.totalMarks}</p>
            <p>Date: {exam.date.toDate().toLocaleDateString()}</p>
          </Link>
        ))
      ) : (
        <span className="ml-10 mt-5">No upcoming exams</span>
      )}

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
        <div>No past exams</div>
      )}
    </div>
  );
};

export default AllExams;
