import { useMediaQuery } from "@chakra-ui/react";

export const useDevice = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1024px)", {
    ssr: true,
    fallback: false,
  });

  const [isMobile] = useMediaQuery("(max-width: 480px)", {
    ssr: true,
    fallback: false,
  });
  return {
    isMobile,
    isDesktop,
  };
};
