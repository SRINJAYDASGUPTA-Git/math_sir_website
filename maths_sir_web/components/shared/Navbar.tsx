"use client";
import { navLinks } from "@/constants";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
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
      className={`text-xl w-full ps-5 pe-3 py-2 flex justify-between bg-gradient-to-b from-[#9747FF]/50 to-[#FFFFFF]/10 backdrop-blur-md top-0 left-0 sticky z-10 transition-transform duration-300 transform ${
        show ? "bg-gradient-to-b from-[#9747FF]/50 to-[#FFFFFF]/10" : "bg-gradient-to-b from-[#9E53FF]/80 to-[#C8A8F1]/70"
      }`}
    >
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          width={50}
          height={200}
          alt="Logo"
          className="md:w-[80px]"
        />
      </Link>
      <div className="flex-center justify-between gap-10">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton afterSignOutUrl="/" showName/>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-center font-bold rounded-full p-2 px-4 bg-[#FDD7BB]">
          <SignInButton  />
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
