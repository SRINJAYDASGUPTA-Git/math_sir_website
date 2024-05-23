"use client";
import { navLinks } from "@/constants";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
interface NavbarProps {
  show: boolean;
}


const Navbar = ({ show }: NavbarProps) => {
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <nav
      className={`text-xl w-full ps-5 flex justify-between backdrop-blur-md top-0 left-0 sticky z-10 transition-transform duration-300 transform ${
        show
          ? "bg-gradient-to-b from-[#9747FF]/50 to-[#FFFFFF]/10"
          : "bg-gradient-to-b from-[#9E53FF]/60 to-[#9E53FF]/40 backdrop-blur-lg shadow-sm shadow-[#9E53FF]/10"
      }`}
    >
      <Link
        href={"/"}
        className="flex flex-row place-items-center justify-center"
      >
        <Image
          src={"/logo.svg"}
          width={40}
          height={200}
          alt="Logo"
          className="md:w-[60px]"
        />
        <span
          className={`hidden md:block ms-2 text-black leading-[1.25rem] text-xl ${
            show
              ? "opacity-0 hidden"
              : "opacity-100 block transition-opacity ease-in-out duration-1000"
          }`}
        >
          Because
          <br />
          of Maths
        </span>
      </Link>
      <div className="flex-center place-items-baseline  justify-between gap-2 md:gap-10 text-[13px] md:text-lg">
        <div className="md:flex flex-row gap-2 md:gap-8 hidden ">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </div>
        <SignedIn>
          <div className="md:bg-white md:p-2 md:rounded-l-xl md:shadow-sm flex-center">
            <UserButton showName afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-center rounded-2xl shadow md:p-1 px-2 md:px-5 bg-[#FDD7BB] text-[10px] md:text-lg">
            <SignInButton />
          </div>
        </SignedOut>
        <section className="w-full max-w-[264px] md:hidden flex-center">
          <Sheet>
            <SheetTrigger className="items-center text-center h-fit">
              <Image src={'/hamburger.svg'} height={30} width={30} alt="Menu"/>
            </SheetTrigger>
            <SheetContent side={"right"} className="border-none bg-white">
              <Link
                className="cursor-pointer flex items-center gap-1 px-4"
                href="/"
              >
                <Image
                  src={"/logo.svg"}
                  width={34}
                  height={34}
                  alt="BoM Logo"
                />
                <h1 className="text-26 font-bold text-black-1">
                  Because Of Maths
                </h1>
              </Link>
              <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                <SheetClose asChild>
                  <nav className="flex h-full flex-col gap-3 pt-4 text-black">
                    {navLinks.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);
                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            key={item.label}
                            href={item.href}
                            className={cn(" flex gap-3 items-center p-2 rounded-lg w-full max-w-60", {
                              "bg-[#0179FE]": isActive,
                            })}
                          >
                            <p
                              className={cn(
                                "text-16 font-semibold text-black-2",
                                {
                                  "!text-white": isActive,
                                }
                              )}
                            >
                              {item.label}
                            </p>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
