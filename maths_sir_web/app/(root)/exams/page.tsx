import Navbar from "@/components/shared/Navbar";
import React from "react";

const ExamsList = () => {
  return (
    <>
      <Navbar show={false} />
      <section className="flex-center flex-col">
        <div>Upcoming Exams</div>
        <div>Past Exams</div>
      </section>
    </>
  );
};

export default ExamsList;
