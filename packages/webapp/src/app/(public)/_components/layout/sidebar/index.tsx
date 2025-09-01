import { ClipboardPlusIcon, LogInIcon } from "lucide-react";
import Link from "next/link";
import { TbBook, TbPray, TbHeart } from "react-icons/tb";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import HeaderLogo from "../header/header-logo";
import { SideBarNavItem } from "./sidebar-item";
import { HeaderLogoToggle } from "../header/header-logo-toggle";
import { HideAuth } from "./hide-auth";

const authItems = [
  {
    title: "Log in",
    url: "/login",
    icon: LogInIcon,
  },
  {
    title: "Sign Up",
    url: "/signup",
    icon: ClipboardPlusIcon,
  },
];

const prayerAndCommunityItems = [
  {
    title: "Journal",
    url: "/journal",
    icon: TbBook,
  },
  {
    title: "Prayer Wall",
    url: "/prayer-wall",
    icon: TbPray,
  },
  {
    title: "Hope",
    url: "/hope",
    icon: TbHeart,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="px-5">
        <HeaderLogoToggle>
          <HeaderLogo />
        </HeaderLogoToggle>
      </SidebarHeader>

      <SidebarContent>
        <HideAuth>
          {" "}
          <SidebarGroup>
            <SidebarGroupLabel>Authentication</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {authItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SideBarNavItem>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SideBarNavItem>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </HideAuth>

        <SidebarGroup>
          <SidebarGroupLabel>Prayer & Community</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {prayerAndCommunityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SideBarNavItem>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SideBarNavItem>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
