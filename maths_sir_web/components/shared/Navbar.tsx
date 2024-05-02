"use client";
import { navLinks } from "@/constants";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  show: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ show }) => {
  const { user } = useUser();

  return (
    <nav
      className={`text-xl w-full ps-5 flex justify-between backdrop-blur-md top-0 left-0 sticky z-10 transition-transform duration-300 transform ${show ? "bg-gradient-to-b from-[#9747FF]/50 to-[#FFFFFF]/10" : "bg-gradient-to-b from-[#9E53FF]/60 to-[#9E53FF]/40 backdrop-blur-lg shadow-sm shadow-[#9E53FF]/10"
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
        <span className={`ms-2 text-black leading-[1.25rem] text-xl ${show ? "opacity-0 hidden" : "opacity-100 block transition-opacity ease-in-out duration-1000"}`}>Because<br />of Maths</span>
      </Link>
      <div className="flex-center justify-between gap-2 md:gap-10 text-[13px] md:text-lg ">
        <div className="flex flex-row gap-2 md:gap-8">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </div>
        <SignedIn>
          <div className="bg-white p-2 rounded-l-xl shadow-sm">
            <UserButton showName afterSignOutUrl="/"/>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center pe-3 md:pe-10 justify-center rounded-2xl shadow md:p-1 px-2 md:px-5 bg-[#FDD7BB] text-[16px] md:text-lg">
            <SignInButton />
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
