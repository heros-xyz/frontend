import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minH="calc(100vh)">
      <Header />
      <Box as="main" flex={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
