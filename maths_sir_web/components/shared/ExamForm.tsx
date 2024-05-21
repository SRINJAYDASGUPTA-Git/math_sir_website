"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import type { Exam } from "@/utils";
import { addExamToDB } from "@/utils";
import { classData, courseData, examFormSchema } from "@/constants";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Calendar } from "../ui/calendar";
import { Timestamp } from "firebase/firestore";

const ExamForm = () => {
  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      exname: "",
      desc: "",
      std: "",
      totalmarks: "0",
    },
  });
  const { user } = useUser();
  const title = "Exam Details";
  const subtitle = "Enter the details to shedule an upcoming exam";
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isAdmin, setisAdmin] = useState<boolean>(false);
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  const onSubmit = (values: z.infer<typeof examFormSchema>) => {
    // Transform form values to match the Exam type
    const examDetails = {
      examName: values.exname,
      standardClass: values.std,
      description: values.desc,
      totalMarks: parseInt(values.totalmarks),
      date: Timestamp.fromDate(values.date),
    };

    // Add exam to database
    addExamToDB(examDetails)
      .then(() => {
        // Check for userEmail and handle routing
        if (userEmail) {
          router.push("/exams");
        } else {
          alert("No Internet!");
        }
      })
      .catch((error) => {
        console.error("Error adding exam:", error);
      });
  };


  if (!user) return <div>Loading...</div>;
  return (
    <section>
      <div className="w-full flex-center mt-5">
        <div className="w-[84%] flex-between bg-[#FEF5EA] rounded-xl">
          {/* Onboarding Form */}
          <div className="flex flex-col p-10">
            <span className="text-[20px] md:text-3xl font-bold">{title}</span>
            <span className="w-[80%] md:w-[100%] text-[13px] md:text-lg">
              {subtitle}
            </span>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8 mt-10"
              >
                {/* name */}
                <FormField
                  control={form.control}
                  name="exname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam name</FormLabel>
                      <FormControl>
                        <Input placeholder="Test 1" {...field} className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* class */}
                <FormField
                  control={form.control}
                  name="std"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Course</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className={cn(
                                "w-full justify-start text-[#333] flex-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? courseData.find(
                                  (course) => course.title === field.value
                                )?.title
                                : "Select Course"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[80vw] md:w-[19vw] p-3 text-[#333] ">
                          <Command>
                            <CommandInput
                              placeholder="Search Class..."
                              className="h-9 p-1 text-[#333] "
                            />
                            <CommandList>
                              <CommandEmpty>No Course found.</CommandEmpty>
                              <CommandGroup>
                                {courseData.map((classD) => (
                                  <CommandItem
                                    value={classD.title}
                                    key={classD.id}
                                    onSelect={() => {
                                      form.setValue("std", classD.id);
                                    }}
                                  >
                                    {classD.title}
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        classD.title === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Pick a Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* description */}
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Test description" {...field} className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* total marks */}
                <FormField
                  control={form.control}
                  name="totalmarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Marks</FormLabel>
                      <FormControl>
                        <Input  {...field} className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <section className="hidden w-[35%] md:block">
            <Image
              src="/onboarding-img.png"
              alt="Onboarding"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-ful mt-3 rounded-xl"
            />
          </section>
        </div>
      </div>
    </section>
  );
};

export default ExamForm;
