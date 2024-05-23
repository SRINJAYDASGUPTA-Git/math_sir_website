import React, { useEffect, useState } from "react";
import { getExamScheduleByClass } from "@/utils";
import { Exam } from "@/utils";

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

  if (
    !upcomingExams ||
    !upcomingExams.length ||
    !pastExams ||
    !pastExams.length
  ) {
    return <div>No exams found for class {standardClass}</div>;
  }
  console.log(upcomingExams, pastExams);
  return (
    <div className="ml-5">
      <h2>Upcoming Exams</h2>
      {loading ? (
        <div>Loading...</div>
      ) : upcomingExams && upcomingExams.length ? (
        upcomingExams.map((exam, index) => (
          <div
            key={index}
            className="flex flex-col p-3 border border-black rounded-md w-fit ml-10 mt-5 text-[12px] md:text-base"
          >
            <h3>Exam Name: {exam.examName}</h3>
            <p>Class: {exam.class} </p>
            <p>Description: {exam.description}</p>
            <p>Total Marks: {exam.totalMarks}</p>
            <p>Date: {exam.date.toDate().toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <span className="ml-10 mt-5">No upcoming exams</span>
      )}

      <h2>Past Exams</h2>
      {loading ? (
        <div>Loading...</div>
      ) : pastExams && pastExams.length ? (
        pastExams.map((exam, index) => (
          <div
            key={index}
            className="flex flex-col p-3 border border-black rounded-md w-fit ml-10 mt-5 text-[12px] md:text-base"
          >
            <h3>Exam Name: {exam.examName}</h3>
            <p>Description: {exam.description}</p>
            <p>Total Marks: {exam.totalMarks}</p>
            <p>Date: {exam.date.toDate().toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <div>No past exams</div>
      )}
    </div>
  );
};

export default ExamsByClass;
