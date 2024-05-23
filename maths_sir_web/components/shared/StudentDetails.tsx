'use client';
import { User, getUsersFromCourse } from "@/utils";
import { courseData } from "@/constants";
import { useEffect, useState } from "react";
import StudentDataTable from "./DataTable";
const fetchStudents = async (courseId: string) => {
    try {
      const users = await getUsersFromCourse(courseId);
      return users;
    } catch (error) {
      console.error('Error fetching students:', error);
      return null; 
    }
  };
const StudentDetails = ({course}:{course:string}) => {
  const courseHead = courseData.find((c) => c.id === course)?.title || "";
  const [students, setStudents] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedStudents = await fetchStudents(course);
      setStudents(fetchedStudents);
      setIsLoading(false);
    };

    fetchData();
  }, [course]);

  if(isLoading) return <p>Loading...</p>;
  return (
    <>
      <section className="w-full flex flex-col gap-4 p-5">
        <div className="p-5 bg-[#f5f5f5] rounded-xl shadow-md">
          <h1 className="text-xl md:text-4xl underline">Students of {courseHead}</h1>
            <StudentDataTable data={students!} />
        </div>
      </section>
    </>
  );
};

export default StudentDetails;
