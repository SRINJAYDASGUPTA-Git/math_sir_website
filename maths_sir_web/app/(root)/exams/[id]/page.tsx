"use client";
import {
  Exam,
  User,
  addExamMarksToUser,
  getExamById,
  getUsersFromCourse,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const page = ({ params: { id } }: { params: { id: string } }) => {
  const { user } = useUser();
  const [isAdmin, setisAdmin] = useState<boolean>(false);
  const [examClass, setExamClass] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<User[]>();
  
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const handleAddMarks = async (email: string, marks: string) => {
    try {
      await addExamMarksToUser(email, id, marks);
    } catch (error) {
      console.error("Error adding marks to user:", error);
    } finally {
      console.log("Marks added successfully");
    }
  };
  const fetchUsers = async () => {
    if (examClass) {
      const users = await getUsersFromCourse(examClass);
      setUsers(users!);
    }
  };
  useEffect(() => {
    const fetchUsersAndExam = async () => {
      if (userEmail) {
        if (userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID) {
          setisAdmin(true);
        }
        const exam = await getExamById(id);
        setExamClass(exam?.class || "");
      }
    };
    fetchUsersAndExam();
  }, [userEmail]);
  console.log(isAdmin, examClass);
  useEffect(() => {
    fetchUsers();
  }, [examClass]);
  console.log(users);
  return (
    <>
      <div className={``}>
        {users?.map((user) => {
            let marks = ""
            const setMarks = (value: string) => {   
                marks = value
            }
          return (
            <div key={user.email} className="flex-center flex-col">
              <div className="flex-center w-1/2 justify-between gap-10">
                <p>{user.name}</p>
                <input
                  type="text"
                  placeholder="Enter marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
                <button
                  onClick={() => handleAddMarks(user.email, marks)}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Marks
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
