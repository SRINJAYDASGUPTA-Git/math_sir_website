"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { classData } from '@/constants';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Textarea } from '../ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface FormProps{
  type:'contact'|'onboarding'|'exam';
  onSubmit:({
        name,
        email,
        number,
        school,
        exname,
        totalmarks,
        desc,
        date,
        std,
        message
      }:{
        name?:string,
        email?:string,
        number?:string,
        school?:string,
        exname?:string
        totalmarks?:string
        desc?:string
        date?:string
        std?:string,
        message?:string
      })=>void;
    }
    const Form = ({type, onSubmit}:FormProps) => {
    const { user } = useUser();
    const title = type === 'contact'?'Contact Us': type === 'exam'? "Exam Details" : "Tell us about Yourself"
    const subtitle = type === 'contact'?'We\'re here to listen! Drop us a message using the form below, and we\'ll be swift to reach out to you.': type === 'exam'?'Enter the details to shedule an upcoming exam':'Let\'s get to know you! Share a few details, and let\'s start your math journey together!'
    const [open, setOpen] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [school, setSchool] = useState<string>("");
    const [std, setStd] = useState<string>("");
    const [exname, setExname] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [totalmarks, setTotalMarks] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();
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
        <div className={`w-[95%] ${type === 'exam'?'md:w-[100%]':'md:w-[80%]'} flex-between bg-[#FEF5EA] rounded-xl`}>
          {/* Onboarding Form */}
          <section className="w-full md:w-1/4 flex flex-col gap-10 p-8">
            <div className="flex flex-col gap-3 p-3">
              <span className="text-[16px] md:text-5xl font-bold">
                {title}
              </span>
              <span className="text-[13px] md:text-3xl">
                {subtitle}
              </span>
            </div>
            {/* Name */}
            <div className={cn("flex flex-col gap-3")}>
              <div className="w-full flex flex-between gap-3">
              <div className={cn("flex flex-col gap-3", type === 'exam'?'hidden':'')}>
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
                <div className={cn("flex flex-col gap-3", type === 'exam'?'hidden':'')}>
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
            <div className={cn("flex flex-col gap-3", type === 'onboarding'?'block':'hidden')}>
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
            <div className={cn("flex flex-col gap-3", type === 'exam'?'hidden':'')}>
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
            <div className={cn("flex flex-col gap-3", type === 'onboarding'?'block':'hidden')}>
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
            <div className={cn("flex flex-col gap-3", type === 'contact'?'hidden':'block')}>
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
                      <CommandEmpty>No Class found.</CommandEmpty>
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
            <div className={cn("flex flex-col gap-3", type === 'contact'?'block':'hidden')}>
              <label htmlFor="message">Message</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
            <div className={cn("flex flex-col gap-3", type === 'exam'?'show':'hidden')}>
              <label htmlFor="name">Exam Name</label>
              <Input
                type="text"
                id="ExamName"
                value={exname}
                onChange={(e) => setExname(e.target.value)}
                className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className={cn("flex flex-col gap-3", type === 'exam'?'show':'hidden')}>
              <label htmlFor="name">Exam Date</label>
              <Input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className={cn("flex flex-col gap-3", type === 'exam'?'show':'hidden')}>
              <label htmlFor="name">Exam Description</label>
              <Input
                type="text"
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className={cn("flex flex-col gap-3", type === 'exam'?'show':'hidden')}>
              <label htmlFor="name">Total Marks</label>
              <Input
                type="number"
                id="FM"
                value={totalmarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
                {/* Submit */}
            <div className="flex flex-col gap-3">
              <Button
                className="p-3 rounded-lg bg-[#FFA15A] text-white w-fit "
                onClick={() => onSubmit({
                  name: firstName + " " + lastName,
                  email,
                  number,
                  school,
                  std,
                  message
                })}
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
}

export default Form