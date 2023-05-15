import { Box, BoxProps, useUpdateEffect } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
import { ACTIVE_PATHS, ADMIN_ROLE, ATHLETE_ROLE } from "@/utils/constants";
import MenuItem from "../MenuItem";

interface DashboardSidebarProps extends BoxProps {
  tabValue: string;
  role: "ATHLETE" | "FAN" | "ADMIN";
}

interface INavItem {
  id: string;
  Icon: ReactNode;
  itemName: string;
  activeIcon: ReactNode;
  show: boolean;
  disabled: boolean;
  path: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  tabValue,
  role,
  ...props
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [tab, setTab] = useState<string>(router.pathname ?? "");

  const menuList: INavItem[] = [
    {
      id: "home",
      Icon: <HomeIcon w={6} h={6} />,
      itemName: "Home",
      activeIcon: <HomeActive w={6} h={6} />,
      show: true,
      disabled: false,
      path: role === ATHLETE_ROLE ? "/athlete" : "/fan",
    },
    {
      id: "noti",
      Icon: <NotificationIcon w={6} h={6} />,
      itemName: "Notifications",
      activeIcon: <NotificationActive w={6} h={6} />,
      show: true,
      disabled: session?.user.role === ADMIN_ROLE,
      path:
        role === ATHLETE_ROLE ? "/athlete/notification" : "/fan/notification",
    },
    {
      id: "interaction",
      Icon: <InteractionsIcon w={6} h={6} />,
      itemName: "Interactions",
      activeIcon: <InteractionsActive w={6} h={6} />,
      show: true,
      disabled: false,
      path:
        role === ATHLETE_ROLE ? "/athlete/interactions" : "/fan/interactions",
    },

    {
      id: "fan",
      Icon: <MyfanIcon w={6} h={6} />,
      itemName: "My Fans",
      activeIcon: <MyfansActive w={6} h={6} />,
      show: role === ATHLETE_ROLE,
      disabled: false,
      path: "/athlete/my-fan",
    },
    {
      id: "profile",
      Icon: <ProfileIcon w={6} h={6} />,
      itemName: "My Profile",
      activeIcon: <ProfileActive w={6} h={6} />,
      show: true,
      disabled: false,
      path: role === ATHLETE_ROLE ? "/athlete/my-profile" : "/fan/my-profile",
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
      bg="primary"
      p={{ base: 2.5, lg: 14 }}
      w={{ base: "full", lg: "320px" }}
      minH={{ base: "59px", lg: "100%" }}
      {...props}
      zIndex={2}
    >
      <Link href="/">
        <LogoSidebar
          display={{ base: "none", lg: "block" }}
          maxW={28}
          maxH={10}
          onClick={() => setTab(role === ATHLETE_ROLE ? "/athlete" : "/fan")}
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
