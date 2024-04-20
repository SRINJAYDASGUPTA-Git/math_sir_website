import { doc, setDoc, updateDoc } from 'firebase/firestore';
import {app, db} from '../firebase';

interface User{
    name:string;
    email:string;
    phoneNumber:string;
    school:string;
    courses:string[];
    class:string;
}

export const addUsersToDB = async (user: User) => {
    await setDoc(doc(db, "users", user.email), {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        school: user.school,
        courses: user.courses,
        class: user.class
      });
      console.log("Document written with ID: ", user.email);
}
export const addUserCourseToDB = async ({user, course}:{user: User, course:string}) => {
    await updateDoc(doc(db, "users", user.email), {
        courses: user.courses.push(course),
      });
      console.log(`Course: ${course} added to user with id:${user.email}`);
}