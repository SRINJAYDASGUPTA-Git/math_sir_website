"use client";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
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
import { classData, courseData } from "@/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import { addUsersToDB } from "@/utils";
import { useRouter } from "next/navigation";
const Onboarding = () => {
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [std, setStd] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const handleAddUser = () => {
    addUsersToDB({
      name: firstName + " " + lastName,
      email: email as string,
      phoneNumber: number,
      school,
      courses: [],
      class: std,
    });

    router.push("/");
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.emailAddresses[0].emailAddress || "");
    }
  }, [user]);

  if (!user) return <div>Loading...</div>;
  return (
    <div className="w-full flex-center">
      <div className="w-[95%] md:w-[90%] flex-between bg-[#FEF5EA] rounded-xl">
        {/* Onboarding Form */}
        <section className="w-full md:w-1/4 flex flex-col gap-10 p-8">
          <div className="flex flex-col gap-3 p-3">
            <span className="text-[16px] md:text-5xl font-bold">
              Tell us about Yourself
            </span>
            <span className="text-[13px] md:text-3xl">
              Let's get to know you! Share a few details, and let's start your
              math journey together!
            </span>
          </div>
          {/* Name */}
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-between gap-3">
              <div className="flex flex-col gap-3">
                <label htmlFor="name">First Name</label>
                <Input
                  type="text"
                  id="name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="name">Last Name</label>
                <Input
                  type="text"
                  id="name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
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
              value={email}
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
            <label htmlFor="name">Class</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-start text-[#333] "
                >
                  {std
                    ? classData.find((classD) => classD.title === std)?.title
                    : "Select Class..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[45vw] p-3 text-[#333] ">
                <Command>
                  <CommandInput
                    placeholder="Search Class..."
                    className="h-9 p-1 text-[#333] "
                  />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {classData.map((courseD) => (
                        <CommandItem
                          key={courseD.id}
                          value={courseD.title}
                          className="text-[#333] "
                          onSelect={(currentValue) => {
                            setStd(currentValue === std ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              std === courseD.title
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
            <Button
              className="p-3 rounded-lg bg-[#FFA15A] text-white w-fit "
              onClick={handleAddUser}
            >
              Continue
            </Button>
          </div>
        </section>
        {/* Image */}
        <section className="hidden md:w-[35%] md:block">
          <Image
            src="/onboarding-img.png"
            alt="Onboarding"
            width={500}
            height={500}
            className="w-full"
          />
        </section>
      </div>
    </div>
  );
};

export default Onboarding;
