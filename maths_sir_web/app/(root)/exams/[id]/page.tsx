"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Navbar from "../../../../components/shared/Navbar";
import React, { useEffect, useState } from "react";
import {
  Exam,
  addExamMarksToUser,
  getExamById,
  getExamMarksForUser,
  getUsersForExam,
} from "../../../../utils";
const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [exam, setExam] = useState<Exam | null>(null);
  const [users, setUsers] = useState<
    | {
        email: string;
        name: string;
        examId: string | null;
        marks: string | null;
      }[]
    | null
  >(null);
  const [userMarks, setUserMarks] = useState<string | null>(null);

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  const handleAddMarks = async (email: string, marks: string) => {
    try {
      await addExamMarksToUser(email, id, marks);
      console.log("Marks added successfully");
      fetchUsers(); // Refresh the user list to show updated marks
    } catch (error) {
      console.error("Error adding marks to user:", error);
    }
  };

  const fetchUsers = async () => {
    if (exam?.class) {
      const users = await getUsersForExam(exam.class, id);
      setUsers(users);
    }
  };

  useEffect(() => {
    const fetchExamDetails = async () => {
      if (userEmail) {
        const examDetails = await getExamById(id);
        setExam(examDetails);

        if (userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID) {
          setIsAdmin(true);
        } else {
          // Fetch user's marks for the specific exam
          const marks = await getExamMarksForUser(userEmail, id);
          setUserMarks(marks);
        }
      } else {
        router.push("/"); // Redirect if no user email
      }
    };
    fetchExamDetails();
  }, [userEmail]);

  useEffect(() => {
    if (isAdmin && exam?.class) {
      fetchUsers();
    }
  }, [isAdmin, exam]);

  return (
    <>
      <Navbar show={false} />
      <div className="container mx-auto p-6">
        {exam && (
          <div className="flex flex-col text-center">
            <h1 className="text-2xl font-bold mb-4">{exam.examName}</h1>
            <p className="mb-2">
              <b>Description:</b> {exam.description}
            </p>
            <p className="mb-2">
              <b>Class:</b> {exam.class}
            </p>
            <p className="mb-2">
              <b>Total Marks:</b> {exam.totalMarks}
            </p>
            <p className="mb-4">
              <b>Date:</b> {exam.date.toDate().toDateString()}
            </p>
          </div>
        )}
        {isAdmin ? (
          <>
            <h2 className="text-xl font-bold mb-4">Exam Marks Entry</h2>
            {users?.map((user) => {
              let marks = "";
              const setMarks = (value: string) => {
                marks = value;
              };
              return (
                <section
                  key={user.email}
                  className="flex flex-row justify-start placed items-center border shadow-sm mb-4 p-4 rounded"
                >
                  <div className="p-4">
                    <p className="mb-2">
                      Email: {user.email} <br />
                      Name: {user.name} <br />
                      <b>Marks: {user.marks}</b>
                    </p>
                  </div>
                  <div>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Enter marks"
                        className="border p-2 rounded"
                        onChange={(e) => setMarks(e.target.value)}
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleAddMarks(user.email, marks)}
                      >
                        Add Marks
                      </button>
                    </div>
                  </div>
                </section>
              );
            })}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Your Exam Marks</h2>
            <p className="mb-2">
              <b>Marks:</b> {userMarks ?? "No marks available"}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
