'use client';
import React, { useCallback, useEffect, useState } from "react";
import ExamForm from "@/components/shared/ExamForm";
import ExamsByClass from "@/components/shared/ExamsByClass";
import Navbar from '@/components/shared/Navbar'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import AllExams from "@/components/shared/AllExams";

const Exam = () => {
    const { user } = useUser();
    const [isAdmin, setisAdmin] = useState<boolean>(false);
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    const userClass: string[] = user?.publicMetadata?.courses as string[];

    useEffect(() => {
        const fetchUserCourses = async () => {
            if (userEmail) {
                if (userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID) {
                    setisAdmin(true);
                }
            }
        };

        fetchUserCourses();
    }, [userEmail]);
    console.log(userClass)
    return (
        <section>
            <Navbar show={false} />
            <section>
                {!isAdmin ?
                    <div className='w-[100%] flex-center mt-5'>
                        <ExamsByClass standardClass={userClass} />
                    </div> :
                    <>
                        <div className={`${isAdmin ? "show" : "hidden"}`}>
                            <ExamForm />
                        </div>
                        <div className={`${isAdmin ? "show" : "hidden"} w-full md:w-[30%] md:flex-center mt-5 ml-5`}>
                            <AllExams />
                        </div>
                    </>}
            </section>
        </section>
    )
}

export default Exam