import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-4">
        <Image src="/logo.svg" alt="Logo" width={150} height={0} />
        <h1 className="text-3xl">Because of Maths</h1>
        <p className="text-lg">Master math for boards & entrance exams with our comprehensive courses & expert guidance!</p>
      </div>
      
    </main>
  );
}
