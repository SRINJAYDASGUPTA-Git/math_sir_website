"use client";
import { addUsersToDB } from "@/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import { useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { classData, onboardingFormSchema } from "@/constants";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
const Onboarding = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const title = "Tell us about Yourself";
  const subtitle =
    "Let's get to know you! Share a few details, and let's start your math journey together!";
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      school: "",
    },
  });

  function onSubmit(values: z.infer<typeof onboardingFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (userEmail) {
      addUsersToDB({
        name: values.fullName,
        email: userEmail,
        phoneNumber: values.phoneNumber,
        school: values.school,
        courses: [],
        exams: [],
        class: values.std,
      });

      router.push("/");
    }
    else{
      alert("No Internet!");
    };
  }
  return (
    <section>
      <div className="pointer-events-none">
        <Navbar show={false} />
      </div>
      <div className="w-full flex-center mt-5">
        <div className="w-[84%] flex-between bg-[#FEF5EA] rounded-xl">
          {/* Onboarding Form */}
          <div className="flex flex-col p-10">
            <span className="text-[20px] md:text-3xl font-bold">{title}</span>
            <span className="w-[80%] md:w-[60%] text-[13px] md:text-lg">{subtitle}</span>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full md:w-1/2 flex flex-col gap-10 mt-10"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@example.com"
                          {...field}
                          className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890"
                          {...field}
                          className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Example High School"
                          {...field}
                          className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="std"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Class</FormLabel>
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
                                ? classData.find(
                                  (classD) => classD.title === field.value
                                )?.title
                                : "Select Class"}
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
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {classData.map((classD) => (
                                  <CommandItem
                                    value={classD.title}
                                    key={classD.id}
                                    onSelect={() => {
                                      form.setValue("std", classD.title);
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
                <Button type="submit" className="rounded-xl">Continue</Button>
              </form>
            </Form>
          </div>
          {/* Image */}
          <section className="hidden w-[55%] md:block">
            <Image
              src="/onboarding-img.png"
              alt="Onboarding"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-ful mt-3 rounded-xl" />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
