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
  id?: string;
  class: string;
  examName: string;
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
      class: exam.class,
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
      console.log("No users enrolled in the course.");
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

    // 3. Find the existing exam entry
    let examFound = false;
    const updatedExams = userExams.map((exam) => {
      const parts = exam.split(",");
      if (parts[0] === examId) {
        examFound = true;
        return `${examId},${marks}`; // Update the marks for the existing exam
      }
      return exam;
    });

    // If exam not found, add a new entry
    if (!examFound) {
      updatedExams.push(`${examId},${marks}`);
    }

    // 4. Update the user's exams array in Firestore
    await updateDoc(userRef, {
      exams: updatedExams,
    });

    console.log("Exam marks updated successfully for user:", email);
    return true;
  } catch (error) {
    console.error("Error updating exam marks for user:", error);
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
      examData.id = doc.id;

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


export const getExamById = async (examId: string): Promise<Exam | null> => {
  try {
    const examDoc = await getDoc(doc(db, "exams", examId));

    if (!examDoc.exists()) {
      console.log("Exam not found:", examId);
      return null;
    }

    const examData = examDoc.data() as Exam;
    examData.id = examDoc.id;
    return examData;

  } catch (error) {
    console.error("Error retrieving exam by ID:", error);
    return null;
  }
}


export const getExamMarksForUser = async (userId: string, examId: string): Promise<string | null> => {
  try {
    // 1. Get the User Document
    const userDoc = await getDoc(doc(db, "users", userId));

    if (!userDoc.exists()) {
      console.error("User not found:", userId);
      return null;
    }

    // 2. Extract User Data
    const userData = userDoc.data() as User;
    const userExams = userData.exams || []; // Handle cases where exams might not exist

    // 3. Find the Marks for the Specified Exam ID
    for (const exam of userExams) {
      const parts = exam.split(",");
      if (parts[0] === examId) {
        return parts[1] || null; // Return the marks if found, handle cases where marks might be missing
      }
    }

    console.log("Exam ID not found in user's exams:", examId);
    return null; // Exam ID not found in user's exams

  } catch (error) {
    console.error("Error retrieving exam marks for user:", error);
    return null;
  }
};