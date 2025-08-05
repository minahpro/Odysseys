import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { allMenuDatas } from "@/data/menuData";
import Image from "next/image";
import { PrimaryButton } from "./buttons";
import { Menu } from "lucide-react";

export function MobileNav() {
  return (
    <div className="lg:hidden ">
      <Sheet>
        <SheetTrigger asChild>
          <button className=" bg-primary text-white p-2 rounded transitions hover:text-primary hover:scale-110">
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll">
          <SheetHeader>
            <h3 className="text-xl font-bold">
              Safari <span className="text-primary">Episodes</span>
            </h3>
          </SheetHeader>
          <div className="pt-5 bg-accent my-4 p-4 rounded">
            <ul className="flex flex-col space-y-2">
              {allMenuDatas.map((menus, i) => (
                <Link
                  key={i}
                  href={menus.link}
                  className="font-medium hover:text-primary text-sm "
                >
                  <li className="py-2"> {menus.name}</li>
                </Link>
              ))}
            </ul>
          </div>

          <Separator className="my-5" />

          <SheetFooter>
            <SheetClose asChild>
              <div className="space-y-2 w-full">
                <Link href="/plan-your-safari">
                  <PrimaryButton className="w-full font-semibold hover:bg-primary hover:-translate-y-1 transitions rounded bg-primary text-white ">
                    <span>Plan Your Safari</span>
                  </PrimaryButton>
                </Link>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
