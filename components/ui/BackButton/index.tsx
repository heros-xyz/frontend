import { Flex, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { ArrowLeft } from "@/components/svg/ArrowLeft";

interface IBackButton {
  title: string;
  href?: string;
  onBack?: () => void;
}

const BackButton: React.FC<IBackButton> = ({ title, href = "" }) => {
  return (
    <Flex alignItems={"center"}>
      <Link as={NextLink} href={href} mt={{ base: "1px", lg: 2 }}>
        <ArrowLeft
          verticalAlign=""
          w={{ base: 5, xl: 6 }}
          h={{ base: 5, xl: 6 }}
          cursor="pointer"
        />
      </Link>
      <Text
        as="span"
        ml="5"
        fontSize={{ base: "xl", xl: "2xl" }}
        color="primary"
      >
        {title}
      </Text>
    </Flex>
  );
};

export default BackButton;
