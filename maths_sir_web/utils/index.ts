import { doc, setDoc } from 'firebase/firestore';
import {app, db} from '../firebase';

interface User{
    name:string;
    email:string;
    phoneNumber:string;
    school:string;
    course:string;
}

export const addUsersToDB = async (user: User) => {
    await setDoc(doc(db, "users", user.email), {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        school: user.school,
        course: user.course
      });
      console.log("Document written with ID: ", user.email);
}