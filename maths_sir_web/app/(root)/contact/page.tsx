"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contactFormSchema } from "@/constants";
import { useUser } from "@clerk/nextjs";

interface Content {
  authorName: string;
  authorImage: string;
  reviewText: string;
}

const Contact = () => {
  const {user} = useUser();
  const router = useRouter();
  const title = "Contact Us";
  const subtitle =
    "We're here to listen! Drop us a message using the form below, and we'll be swift to reach out to you.";
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false)
  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const from = "Admin<admin@becauseofmaths.in>";
    const to = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID;

    const subject = `${values.fullName}'s Message`
    const content:Content = {
      authorName:values.fullName,
      authorImage:user?.imageUrl || '/Default_pfp.jpg',
      reviewText:values.message
    }

    const replyTo = values.email;
    const data = {
      from,
      to,
      subject,
      content,
      reply_to: replyTo,
    }
    try {
      setLoading(true);
      const response = await fetch('/api/send', {
        method: 'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
      })

      if(response) console.log(response)
      
    } catch (error:any) {
        throw new Error(error)
    } finally {
      setLoading(false);
    }
    router.push("/");
  }
  return (
    <div className="w-full flex-center">
      <div className="w-[95%] md:w-[90%] flex-between bg-[#FEF5EA] rounded-xl">
        {/* Onboarding Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full md:w-1/4 flex flex-col gap-10 p-8"
          >
            <span className="text-[16px] md:text-5xl font-bold">{title}</span>
            <span className="text-[13px] md:text-3xl">{subtitle}</span>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message..."
                      {...field}
                      className="p-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading? 'Loading...':'Send'}
            </Button>
          </form>
        </Form>
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

export default Contact;
