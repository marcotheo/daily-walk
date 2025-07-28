import * as React from "react";
import Link from "next/link";
import { User } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import UnAuthState from "./unauth-state";
import { Button } from "@/components/ui/button";
import AuthState from "./auth-state";
// import Logout from "./logout";

export default async function AccountNavigation() {
  return (
    <>
      <UnAuthState>
        <div className={cn("space-x-2", "flex items-end", "max-lg:hidden")}>
          <Link href="/login">
            <Button
              variant="outline"
              className={cn("h-full py-4 min-w-24", "rounded-3xl")}
            >
              Log in
            </Button>
          </Link>

          <Link href="/signup">
            <Button
              className={cn(
                "h-full py-4 min-w-24",
                "rounded-3xl",
                "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              )}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </UnAuthState>

      <AuthState>
        <nav className={cn("space-x-2", "flex items-end", "max-lg:hidden")}>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "p-4 h-full bg-popover rounded-full",
                    "text-black dark:text-white",
                    "shadow-lg cursor-pointer"
                  )}
                >
                  <User className={cn("size-7")} />
                </NavigationMenuTrigger>

                <NavigationMenuContent className="-translate-x-12">
                  <ul className="grid min-w-[7rem] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        {/* <Logout /> */} asdasd
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </AuthState>
    </>
  );
}
