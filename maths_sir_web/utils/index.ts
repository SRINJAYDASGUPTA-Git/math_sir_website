import { arrayUnion, doc, setDoc, updateDoc, addDoc, Timestamp } from "firebase/firestore";
import { app, db } from "../firebase";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";

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
  class: string;
  examName: string;
  standardClass: string;
  description: string;
  totalMarks: number;
  date: Timestamp;
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

export const getUsersForExam = async (standardClass: string, examId: string): Promise<{ email: string; name: string; examId: string | null; marks: string | null }[] | null> => {
  try {
    // 1. Find Users Enrolled in the Class
    const q = query(
      collection(db, "users"),
      where("courses", "array-contains", standardClass)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No users enrolled in the class.");
      return null;
    }

    const users: { email: string; name: string; examId: string | null; marks: string | null }[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data() as User;

      // 2. Extract Exam ID and Marks (modify to match your schema)
      const userExams = userData.exams || []; // Handle cases where exams might not exist

      let matchingExam: { examId: string; marks: string | null } | undefined; // Use undefined for potential absence

      userExams.forEach((exam) => {
        const parts = exam.split(","); // Split exam string (modify if separator is different)
        if (parts.length >= 1 && parts[0] === examId) {
          matchingExam = {
            examId: parts[0],
            marks: parts[1] || null, // Handle cases where marks might be missing
          };
          // Exit loop after finding a match (assuming only one match)
          return;
        }
      });

      users.push({
        email: userData.email,
        name: userData.name,
        examId: matchingExam?.examId || null, // Use optional chaining for examId
        marks: matchingExam?.marks || null, // Use optional chaining for marks
      });
    });

    return users;
  } catch (error) {
    console.error("Error retrieving users for class:", error);
    return null;
  }
};
//Demo Function Call
// const usersForClass = await getUsersForClass(standardClass, examId);

// if (usersForClass) {
//   console.log("Users and their Exam Results:");
//   usersForClass.forEach((user) => {
//     console.log(`  - User: ${user.email} - Name: ${user.name}`);
//     if (user.examId) { // Check if examId exists before printing
//       console.log(`      Exam ID: ${user.examId}, Marks: ${user.marks}`);
//     } else {
//       console.log("      No result found for this exam.");
//     }
//   });
// } 


export const addExamMarksToUser = async (email: string, examId: string, marks: string): Promise<boolean> => {
  try {
    // 1. Find the User Document
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("User not found:", email);
      return false;
    }

    // 2. Update User's Exam Array (modify to match your schema)
    const userRef = querySnapshot.docs[0].ref; // Get reference to the first user (assuming unique email)
    const userData = querySnapshot.docs[0].data() as User;
    const userExams = userData.exams || []; // Handle cases where exams might not exist

    userExams.push(`${examId},${marks}`); // Add exam ID and marks as comma-separated string

    await updateDoc(userRef, {
      exams: userExams,
    });

    console.log("Exam added successfully for user:", email);
    return true;
  } catch (error) {
    console.error("Error adding exam to user:", error);
    return false;
  }
};


export const getExamSchedule = async (date: Date): Promise<{ upcomingExams: Exam[]; pastExams: Exam[] } | null> => {
  try {
    // 1. Get All Exams from Firestore (modify to match your schema)
    const exams = await getDocs(collection(db, "exams"));

    if (exams.empty) {
      console.log("No exams found in the database.");
      return null;
    }

    const upcomingExams: Exam[] = [];
    const pastExams: Exam[] = [];

    exams.forEach((doc) => {
      const examData = doc.data() as Exam; // Assuming your exam data structure

      // 2. Parse Exam Date (modify to match your date format)
      const examDate = new Date(examData.date.toDate()); // Replace 'date' with your actual date field

      // 3. Compare Dates (consider time zones if needed)
      if (examDate > date) {
        upcomingExams.push(examData);
      } else {
        pastExams.push(examData);
      }
    });

    return { upcomingExams, pastExams };
  } catch (error) {
    console.error("Error retrieving exams:", error);
    return null;
  }
};


export const getExamScheduleByClass = async (classStandards: string[], date: Date): Promise<{ upcomingExams: Exam[]; pastExams: Exam[] } | null> => {
  try {
    // 1. Get All Exams from Firestore (modify to match your schema)
    const exams = await getDocs(collection(db, "exams"));

    if (exams.empty) {
      console.log("No exams found in the database.");
      return null;
    }

    const upcomingExams: Exam[] = [];
    const pastExams: Exam[] = [];

    exams.forEach((doc) => {
      const examData = doc.data() as Exam; // Assuming your exam data structure

      // 2. Parse Exam Date (modify to match your date format)
      const examDate = new Date(examData.date.toDate()); // Replace 'date' with your actual date field

      // 3. Check Class Standard and Compare Dates
      if (classStandards.some((standardClass) => examData.class === standardClass)) {
        if (examDate > date) {
          upcomingExams.push(examData);
        } else {
          pastExams.push(examData);
        }
      }
    });

    return { upcomingExams, pastExams };
  } catch (error) {
    console.error("Error retrieving exams:", error);
    return null;
  }
};
