'use client';
import { User, getUsersFromCourse } from "@/utils";
import { courseData } from "@/constants";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react";
const fetchStudents = async (courseId: string) => {
    try {
      const users = await getUsersFromCourse(courseId);
      return users;
    } catch (error) {
      console.error('Error fetching students:', error);
      return null; // Or handle the error differently
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
  return (
    <>
      <section className="w-full flex flex-col gap-4 p-5">
        <div className="p-5 bg-[#f5f5f5] rounded-xl shadow-md">
          <h1 className="text-xl md:text-4xl underline">Students of {courseHead}</h1>
            <Table className="max-h-[33%] min-h-fit w-full overflow-scroll">
              <TableHeader>
                <TableRow>
                  <TableHead className="">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead className="text-right">Class</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.map((student) => (
                  <TableRow key={student.name}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.school}</TableCell>
                    <TableCell className="text-right">
                      {student.class}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">{students? students.length : 0 }</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
        </div>
      </section>
    </>
  );
};

export default StudentDetails;
