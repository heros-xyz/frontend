import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Head from "next/head";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minH="calc(100vh)">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="manifest" href="/manifest.json" />
        <title>Heros</title>
        <meta name="og:title" content="Heros" />
      </Head>
      <Header />
      <Box as="main" flex={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
