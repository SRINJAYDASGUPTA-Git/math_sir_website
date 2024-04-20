"use client";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { courseData } from "@/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import { addUsersToDB } from "@/utils";
import { useRouter } from "next/navigation";
const Onboarding = () => {
  const { user } = useUser();
  const [name, setName] = useState<string>(user?.fullName || "");
  const [email, setEmail] = useState<string>(user?.emailAddresses[0].emailAddress || "");
  const [number, setNumber] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const handleAddUser = () => {
    addUsersToDB({
      name,
      email: email as string,
      phoneNumber: number,
      school,
      course,
    });
    router.push("/");

  }

  console.log(user?.emailAddresses[0].emailAddress, email)
  console.log(user?.fullName, name)
  return (
    <div className="w-full flex-center">
      <div className="w-[90%] flex-between bg-[#FEF5EA] rounded-xl">
        {/* Onboarding Form */}
        <section className="w-1/4 flex flex-col gap-10 p-8">
          <div className="flex flex-col gap-3 p-3">
            <span className="text-3xl font-bold">Tell us about Yourself</span>
            <span className="text-[20px]">
              Let's get to know you! Share a few details, and let's start your
              math journey together!
            </span>
          </div>
          {/* Name */}
          <div className="flex flex-col gap-3">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {/* Phone Number */}
          <div className="flex flex-col gap-3">
            <label htmlFor="name">Phone Number</label>
            <Input
              type="text"
              id="phonenumber"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-3">
            <label htmlFor="name">E-mail</label>
            <Input
              type="email"
              id="email"
              value={email as string}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {/* School */}
          <div className="flex flex-col gap-3">
            <label htmlFor="name">School Name</label>
            <Input
              type="text"
              id="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {/* Course */}
          <div className="flex flex-col gap-3">
            <label htmlFor="name">Class/Course</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-start text-[#333] "
                >
                  {course
                    ? courseData.find((courseD) => courseD.title === course)
                        ?.title
                    : "Select Course..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[45vw] p-3 text-[#333] ">
                <Command>
                  <CommandInput
                    placeholder="Search activity level..."
                    className="h-9 p-1 text-[#333] "
                  />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {courseData.map((courseD) => (
                        <CommandItem
                          key={courseD.id}
                          value={courseD.title}
                          className="text-[#333] "
                          onSelect={(currentValue) => {
                            setCourse(
                              currentValue === course ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              course === courseD.title
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {courseD.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          {/* Submit */}
          <div className="flex flex-col gap-3">
            <Button className="p-3 rounded-lg bg-[#FFA15A] text-white w-fit " onClick={handleAddUser}>
              Continue
            </Button>
          </div>
        </section>
        {/* Image */}
        <section className="w-[35%]">
          <Image
            src="/onboarding-img.png"
            alt="Onboarding"
            width={
              500
            }
            height={
              500
            }
            className="w-full"
          />
        </section>
      </div>
    </div>
  );
};

export default Onboarding;
