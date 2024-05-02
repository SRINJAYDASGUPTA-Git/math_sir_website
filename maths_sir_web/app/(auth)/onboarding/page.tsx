"use client";
import { addUsersToDB } from "@/utils";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Form from "@/components/shared/Form";
const Onboarding = () => {
  const router = useRouter();
  const handleAddUser = ({ name, email, number, school, std, message }: {
    name: string,
    email: string,
    number?: string,
    school?: string,
    std?: string,
    message?: string
  }) => {
    addUsersToDB({
      name,
      email: email as string,
      phoneNumber: number!,
      school: school!,
      courses: [],
      class: std!,
    });

    router.push("/");
  };

  return (
    <section>
      <Navbar show={false} />
      <Form type="onboarding" onSubmit={handleAddUser} />
    </section>
  );
};

export default Onboarding;
