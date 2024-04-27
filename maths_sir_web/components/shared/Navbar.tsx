"use client";
import { navLinks } from "@/constants";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const {user} = useUser();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    const scrollThreshold = 300; // Define the scroll threshold here
    if (window.scrollY > scrollThreshold && window.scrollY > lastScrollY) {
      // if scroll down beyond the threshold hide the navbar
      setShow(false);
    } else {
      // if scroll up or not beyond the threshold show the navbar
      setShow(true);
    }
    // remember current page location to use in the next move
    setLastScrollY(window.scrollY);
    
    // if (typeof window !== "undefined") {
    //   if (window.scrollY > lastScrollY) {
    //     // if scroll down hide the navbar
    //     setShow(false);
    //   } else {
    //     // if scroll up show the navbar
    //     setShow(true);
    //   }
    //   // remember current page location to use in the next move
    //   setLastScrollY(window.scrollY);
    // }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);
  return (
    <nav
      className={`text-xl w-full ps-5 pe-10 flex justify-between bg-gradient-to-b from-[#9747FF]/50 to-[#FFFFFF]/10 backdrop-blur-md top-0 left-0 sticky z-10 transition-transform duration-300 transform ${
        show ? "bg-gradient-to-b from-[#9747FF]/50 to-[#FFFFFF]/10" : "bg-gradient-to-b from-[#9E53FF]/70 to-[#9E53FF]/30 backdrop-blur-lg shadow-sm shadow-[#9E53FF]/20"
      }`}
    >
      <Link href={"/"} className="flex flex-row place-items-center justify-center">
        <Image
          src={"/logo.svg"}
          width={50}
          height={200}
          alt="Logo"
          className="md:w-[60px]"
        />
        <span className={`ms-2 text-black leading-[1.25rem] text-xl ${show?"opacity-0 hidden":"opacity-100 block transition-opacity ease-in-out duration-1000"}`}>Because<br/>of Maths</span>
      </Link>
      <div className="flex-center justify-between gap-2 md:gap-10 text-[13px] md:text-lg ">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton afterSignOutUrl="/" showName />
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-center rounded-2xl shadow md:p-1 px-2 md:px-5 bg-[#FDD7BB] text-[11px] md:text-lg">
          <SignInButton  />
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
