"use client"
import React, { use, useEffect, useState } from 'react'
import { User, getUsersForExam, getUsersFromCourse } from '@/utils';
const AddMarks = ({marks, examid, email}:{marks: string, examid: string, email:string}) => {
        useEffect(() => {
            const addMarks = async()=>{
                
            }
        }, [email]);
    return (
        <div>AssignedUsers</div>
    )
}

export default AddMarks