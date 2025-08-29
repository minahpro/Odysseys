import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { allMenuDatas } from "@/data/menuData";
import Image from "next/image";
import { SecondaryButton } from "./buttons";
import { Menu } from "lucide-react";

export function MobileNav() {
  return (
    <div className="lg:hidden ">
      <Sheet>
        <SheetTrigger asChild>
          <SecondaryButton className="bg-primary text-accent px-3 py-2">
            <Menu className="h-6 w-6" />
          </SecondaryButton>
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll bg-primary">
          <SheetHeader>
            <div className="flex items-center justify-center ">
              <Image
                src="/white2.png"
                alt="Wild Odysseys Tanzania"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </div>
          </SheetHeader>
          <div className="pt-8">
            <ul className="flex flex-col space-y-2">
              {allMenuDatas.map((menus, i) => (
                <Link
                  key={i}
                  href={menus.link}
                  className="font-semibold hover:bg-accent hover:text-primary transitions text-accent text-sm py-3 px-4 rounded bg-white/5"
                >
                  <li> {menus.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
