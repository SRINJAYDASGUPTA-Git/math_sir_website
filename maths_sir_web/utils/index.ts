import { arrayUnion, doc, setDoc, updateDoc, addDoc } from "firebase/firestore";
import { app, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export type User= {
  name: string;
  email: string;
  phoneNumber: string;
  school: string;
  courses: string[];
  exams: string[];
  class: string;
}

export type Exam = {
  examName: string;
  standardClass: string;
  description: string;
  totalMarks: number;
  date: any;
};


export const addUsersToDB = async (user: User) => {
  await setDoc(doc(db, "users", user.email), {
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    school: user.school,
    courses: user.courses,
    exams: user.exams,
    class: user.class,
  });
  console.log("Document written with ID: ", user.email);
};

export const addCourseToUser = async (userEmail: string, course: string) => {
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

export const getUserCourses = async (
  userEmail: string
): Promise<string[] | null> => {
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

export const getUsersFromCourse = async (
  course: string
): Promise<User[] | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(
        collection(db, "users"),
        where("courses", "array-contains", course)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        resolve(null);
      }

      let users: User[] = [];

      querySnapshot.forEach((doc) => {
        users.push(doc.data() as User);
      });

      resolve(users);
    } catch (error) {
      console.error("Error retrieving users from course:", error);
      reject(null);
    }
  });
};

export const addExamToDB = async (exam: Exam) => {
  try {
    const examRef = await addDoc(collection(db, "exams"), {
      examName: exam.examName,
      standardClass: exam.standardClass,
      description: exam.description,
      totalMarks: exam.totalMarks,
      date: exam.date,
    });
    console.log("Exam added with ID: ", examRef.id);
  } catch (error) {
    console.error("Error adding exam: ", error);
  }
};

export const getExamsByClass = async (standardClass: string): Promise<Exam[] | null> => {
  try {
    const q = query(
      collection(db, "exams"),
      where("standardClass", "==", standardClass)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching exams.");
      return null;
    }

    const exams: Exam[] = [];

    querySnapshot.forEach((doc) => {
      const examData = doc.data();
      exams.push({
        examName: examData.examName,
        standardClass: examData.standardClass,
        description: examData.description,
        totalMarks: examData.totalMarks,
        date: examData.date,
      });
    });

    return exams;
  } catch (error) {
    console.error("Error retrieving exams by class:", error);
    return null;
  }
};