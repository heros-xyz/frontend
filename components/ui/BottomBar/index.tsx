import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { ACTIVE_PATHS } from "@/utils/constants";
import MenuItem from "../MenuItem";

interface BottomBarProps {
  tabValue?: string;
  role: "FAN" | "ATHLETE";
}

interface INavItem {
  id: string;
  Icon: ReactNode;
  itemName: string;
  activeIcon: ReactNode;
  show: boolean;
  path: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ role }) => {
  const router = useRouter();
  const [tab, setTab] = useState<string>(router.pathname ?? "");

  const menuList: INavItem[] = [
    {
      id: "home",
      Icon: <HomeIcon />,
      itemName: "Home",
      activeIcon: <HomeActive />,
      show: true,
      path: role === "ATHLETE" ? "/athlete" : "/fan",
    },
    {
      id: "noti",
      Icon: <NotificationIcon />,
      itemName: "Notification",
      activeIcon: <NotificationActive />,
      show: true,
      path: role === "ATHLETE" ? "/athlete/notification" : "/fan/notification",
    },
    {
      id: "interaction",
      Icon: <InteractionsIcon />,
      itemName: "Interactions",
      activeIcon: <InteractionsActive />,
      show: true,
      path: role === "ATHLETE" ? "/athlete/interactions" : "/fan/interactions",
    },
    {
      id: "fan",
      Icon: <MyfanIcon />,
      itemName: "My Fans",
      activeIcon: <MyfansActive />,
      show: role === "ATHLETE",
      path: "/athlete/my-fan",
    },
    {
      id: "profile",
      Icon: <ProfileIcon />,
      itemName: "My Profile",
      activeIcon: <ProfileActive />,
      show: true,
      path: role === "ATHLETE" ? "/athlete/my-profile" : "/fan/my-profile",
    },
  ];

  useEffect(() => {
    if (ACTIVE_PATHS.includes(router.pathname)) {
      setTab(router.pathname);
    }
  }, [router.pathname]);

  const handleChangeTab = (tab: string): void => {
    setTab(tab);
  };

  return (
    <Box bg="primary" p={2.5} borderColor="primary">
      <Flex justifyContent="space-evenly">
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
      </Flex>
    </Box>
  );
};

export default BottomBar;
