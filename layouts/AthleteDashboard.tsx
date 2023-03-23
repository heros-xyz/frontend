import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import DashboardSidebar from "@components/ui/DashboardSidebar";
import BottomBar from "@/components/ui/BottomBar";

interface LayoutProps {
  children: ReactNode;
}

const AthleteDashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minH="calc(100vh)"
      pb={{ base: 4, xl: 0 }}
    >
      <Box display={{ lg: "flex" }}>
        <Box minH="calc(100vh)" display={{ base: "none", lg: "block" }}>
          <DashboardSidebar tabValue="home" role="ATHLETE" position="fixed" />
        </Box>
        <Box
          as="main"
          flex={1}
          pl={{ xl: "320px" }}
          pb={{ base: 16, lg: 12 }}
          bg="white"
        >
          {children}
        </Box>
      </Box>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        display={{ base: "block", lg: "none" }}
        zIndex={10}
      >
        <BottomBar tabValue="" role="ATHLETE" />
      </Box>
    </Box>
  );
};

export default AthleteDashboardLayout;
