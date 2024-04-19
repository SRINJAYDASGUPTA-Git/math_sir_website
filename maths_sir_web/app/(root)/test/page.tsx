"use client";
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
import { courseData } from "@/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
const page = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start text-[#333] "
        >
          {value
            ? courseData.find((course) => course.title === value)?.title
            : "Select Course..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[45vw] p-3 text-[#333] ">
        <Command>
          <CommandInput
            placeholder="Search activity level..."
            className="h-9 p-1 text-[#333] "
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {courseData.map((course) => (
                <CommandItem
                  key={course.id}
                  value={course.title}
                  className="text-[#333] "
                  onSelect={(currentValue) => {       
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);     
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === course.title ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {course.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default page;
/*

   
 */
