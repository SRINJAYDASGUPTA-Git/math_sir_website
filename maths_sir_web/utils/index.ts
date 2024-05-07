import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  school: string;
  courses: string[];
  class: string;
}

export const addUsersToDB = async (user: User) => {
  await setDoc(doc(db, "users", user.email), {
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    school: user.school,
    courses: user.courses,
    class: user.class,
  });
  console.log("Document written with ID: ", user.email);
};


export const addCourseToUser = async (userEmail:string, course:string) => {
  try {
    const userRef = doc(db, "users", userEmail);
    await updateDoc(userRef, {
      courses: arrayUnion(course),
    });
    console.log("Course added successfully to user!", userRef);
  } catch (error) {
    console.error("Error adding course:", error);
  }
};

export const getUserCourses = async (userEmail: string): Promise<string[] | null> => {
  try {
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    let userCourses: string[] = [];

    querySnapshot.forEach((doc) => {
      userCourses = doc.data().courses;
    });

    return userCourses;
  } catch (error) {
    console.error("Error retrieving user courses:", error);
    return null;
  }
};