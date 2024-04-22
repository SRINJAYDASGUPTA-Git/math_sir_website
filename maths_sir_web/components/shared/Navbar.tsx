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
      className={`text-xl w-full ps-5 pe-10 flex justify-between bg-gradient-to-b from-[#9747FF]/50 to-[#FFFFFF]/10 backdrop-blur-md top-0 left-0 sticky z-10 transition-transform duration-300 transform ${
        show ? "bg-gradient-to-b from-[#9747FF]/50 to-[#FFFFFF]/10" : "bg-gradient-to-b from-[#9E53FF]/80 to-[#C8A8F1]/70"
      }`}
    >
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          width={50}
          height={200}
          alt="Logo"
          className="md:w-[60px]"
        />
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
