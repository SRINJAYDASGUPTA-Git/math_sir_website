import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[url('/bg-signin.jpeg')] bg-cover top-0 left-0 h-[100vh]">
      <Navbar />
      <div className="flex flex-col items-center gap-4 mt-52">
        <Image src="/logo.svg" alt="Logo" width={150} height={0} />
        <h1 className="text-3xl">Because of Maths</h1>
        <p className="text-lg">Master math for boards & entrance exams with our comprehensive courses & expert guidance!</p>
      </div>
      
    </main>
  );
}
