import { Box, BoxProps, useUpdateEffect } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  HomeIcon,
  HomeActive,
  NotificationIcon,
  NotificationActive,
  InteractionsIcon,
  InteractionsActive,
  MyfanIcon,
  MyfansActive,
  ProfileIcon,
  ProfileActive,
} from "@/components/svg/Navigate";
import LogoSidebar from "@/components/svg/LogoSidebar";
import { ACTIVE_PATHS } from "@/utils/constants";
import MenuItem from "../MenuItem";

interface DashboardSidebarProps extends BoxProps {
  tabValue: string;
  role: "ATHLETE" | "FAN";
}

interface INavItem {
  id: string;
  Icon: ReactNode;
  itemName: string;
  activeIcon: ReactNode;
  show: boolean;
  path: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  tabValue,
  role,
  ...props
}) => {
  const router = useRouter();
  const [tab, setTab] = useState<string>(router.pathname ?? "");

  const menuList: INavItem[] = [
    {
      id: "home",
      Icon: <HomeIcon maxW={5} />,
      itemName: "Home",
      activeIcon: <HomeActive maxW={5} />,
      show: true,
      path: role === "ATHLETE" ? "/athlete" : "/fan",
    },
    {
      id: "noti",
      Icon: <NotificationIcon maxW={5} />,
      itemName: "Notification",
      activeIcon: <NotificationActive maxW={5} />,
      show: true,
      path: role === "ATHLETE" ? "/athlete/notification" : "/fan/notification",
    },
    {
      id: "interaction",
      Icon: <InteractionsIcon maxW={5} />,
      itemName: "Interactions",
      activeIcon: <InteractionsActive maxW={5} />,
      show: true,
      path: role === "ATHLETE" ? "/athlete/interactions" : "/fan/interactions",
    },

    {
      id: "fan",
      Icon: <MyfanIcon maxW={5} />,
      itemName: "My Fans",
      activeIcon: <MyfansActive maxW={5} />,
      show: role === "ATHLETE",
      path: "/athlete/my-fan",
    },
    {
      id: "profile",
      Icon: <ProfileIcon maxW={5} />,
      itemName: "My Profile",
      activeIcon: <ProfileActive maxW={5} />,
      show: true,
      path: role === "ATHLETE" ? "/athlete/my-profile" : "/fan/my-profile",
    },
  ];

  const handleChangeTab = (tab: string): void => {
    setTab(tab);
  };

  useEffect(() => {
    if (ACTIVE_PATHS.includes(router.pathname)) {
      setTab(router.pathname);
    }
  }, [router.pathname]);

  useUpdateEffect(() => {
    setTab(tabValue);
  }, [tabValue]);

  return (
    <Box
      bg="secondary"
      p={{ base: 2.5, lg: 14 }}
      w={{ base: "full", lg: "320px" }}
      minH={{ base: "59px", lg: "100%" }}
      {...props}
    >
      <Link href="/">
        <LogoSidebar
          display={{ base: "none", lg: "block" }}
          maxW={28}
          maxH={10}
          onClick={() => setTab(role === "ATHLETE" ? "/athlete" : "/fan")}
        />
      </Link>

      <Box mt={6}>
        {menuList.map(
          (item) =>
            item.show && (
              <MenuItem
                key={item.id}
                {...item}
                isActive={tab === item.path}
                handleClickItem={handleChangeTab}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export default DashboardSidebar;
