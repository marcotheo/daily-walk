import { ClipboardPlusIcon, LogInIcon } from "lucide-react";
import Link from "next/link";

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
import HeaderLogo from "./header-logo";
import { SideBarNavItem } from "./sidebar-item";
import { HeaderLogoToggle } from "./header-logo-toggle";

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

export function AppSidebar() {
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="px-5">
        <HeaderLogoToggle>
          <HeaderLogo />
        </HeaderLogoToggle>
      </SidebarHeader>
      <SidebarContent>
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
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
