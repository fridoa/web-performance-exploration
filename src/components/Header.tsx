"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Link,
} from "@heroui/react";
import { Search } from "lucide-react";
import { HEADER } from "@/constants";

const Header = () => {
  return (
    <Navbar className="py-2" maxWidth="xl" isBordered>
      <NavbarContent justify="start" className="gap-8">
        <NavbarBrand>
          <p className="font-serif text-2xl font-bold text-inherit italic">
            WootWoot
          </p>
        </NavbarBrand>

        <div className="hidden gap-6 sm:flex">
          {HEADER.map((item, index) => (
            <NavbarItem key={index}>
              <Link color="foreground" href="#" className="text-sm font-medium">
                {item.title}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        <Input
          classNames={{
            base: "max-w-[15rem] sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-100/50 dark:bg-default-500/20 rounded-full pr-0 overflow-hidden",
          }}
          placeholder="Search..."
          size="sm"
          type="search"
          endContent={
            <div className="flex h-full w-10 cursor-pointer items-center justify-center bg-slate-700 transition-colors hover:bg-slate-800">
              <Search className="h-4 w-4 text-white" />
            </div>
          }
        />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
