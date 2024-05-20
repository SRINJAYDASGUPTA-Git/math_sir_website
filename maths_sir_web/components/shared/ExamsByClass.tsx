import React, { useEffect, useState } from "react";
import { getExamsByClass } from "@/utils"; 
import { Exam } from "@/utils"; 

interface ExamsByClassProps {
  standardClass: string;
}

const ExamsByClass: React.FC<ExamsByClassProps> = ({ standardClass }) => {
  const [exams, setExams] = useState<Exam[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExams = async () => {
      const fetchedExams = await getExamsByClass(standardClass);
      setExams(fetchedExams);
      setLoading(false);
    };

    fetchExams();
  }, [standardClass]);

  if (loading) {
    return <div>Loading exams...</div>;
  }

  if (!exams) {
    return <div>No exams found for class {standardClass}</div>;
  }

  return (
    <div className="bg-white border border-black p-5 w-fit m-5">
        {exams.map((exam, index) => (
          <div key={index}>
            <h3>Exam Name: {exam.examName}</h3>
            <p>Description: {exam.description}</p>
            <p>Total Marks: {exam.totalMarks}</p>
            <p>Date: {new Date(exam.date).toLocaleDateString()}</p>
          </div>
        ))}
    </div>
  );
};

export default ExamsByClass;
