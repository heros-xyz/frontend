import { Box, Text, HStack, Divider, VStack } from "@chakra-ui/react";
import Image from "next/image";

interface BannerProps {
  title: string;
  banner: string;
}
interface ReadyToJoinProp {
  content: {
    title: string;
    description: string;
    banner: {
      fanBanner: string;
      fanTitle: string;
      athleteBanner: string;
      athleteTitle: string;
    };
  };
}

function Banner(props: BannerProps) {
  return (
    <Box>
      <Image src={props?.banner} alt="banner" width={335} height={105} />
      <HStack
        bg={"primary"}
        borderBottomRadius={"10px"}
        height={12}
        align="center"
        justify={"center"}
      >
        <Text
          color={"secondary"}
          fontSize="md"
          fontWeight={700}
          lineHeight="1.4rem"
          fontFamily={"heading"}
        >
          {props?.title.toUpperCase()}
        </Text>
      </HStack>
    </Box>
  );
}
const ReadyToJoin: React.FC<ReadyToJoinProp> = (props) => {
  const { content } = props;
  return (
    <Box
      bg="accent.4"
      maxWidth={375}
      minHeight={528}
      borderTopRightRadius={"18px"}
      borderBottomRadius={"18px"}
    >
      <VStack mx={5} mt={7.5} mb={10}>
        <Text
          fontFamily={"heading"}
          alignSelf={"flex-start"}
          fontSize={"2xl"}
          as="span"
          color={"accent.2"}
          lineHeight={"2.1rem"}
        >
          {content?.title}
        </Text>
        <Text
          fontFamily={"heading"}
          color="primary"
          fontSize={"sm"}
          as="p"
          lineHeight={"19.6px"}
          pt={0.5}
          pb={1.25}
        >
          {content?.description}
        </Text>
        <Banner
          title={content?.banner?.fanTitle}
          banner={content?.banner?.fanBanner}
        />
        <HStack justifyContent={"space-between"} width="100%" py={5}>
          <Divider maxW={"8.438rem"} />
          <Text fontSize={"xl"} fontWeight={800} fontFamily={"heading"}>
            Or
          </Text>
          <Divider maxW={"8.438rem"} />
        </HStack>
        <Banner
          title={content?.banner?.athleteTitle}
          banner={content?.banner?.athleteBanner}
        />
      </VStack>
    </Box>
  );
};

export default ReadyToJoin;
