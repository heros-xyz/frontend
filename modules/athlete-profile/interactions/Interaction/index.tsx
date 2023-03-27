import {
  AspectRatio,
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Else, If, Then } from "react-if";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import Chat from "@/components/svg/Chat";
import { getImageLink } from "@/utils/link";
import { PlayVideoIcon } from "@/components/svg/PlayVideoIcon";
import { useAthleteInteraction } from "@/hooks/useAthleteInteraction";

export const Interaction = ({}) => {
  const { hasNextPage, interactionsList, onLoadMore } = useAthleteInteraction({
    isGetPublic: true,
  });

  return (
    <Box marginTop={{ base: 0, xl: "50px" }} maxWidth="500px">
      <Box
        paddingX={{ base: "16px", xl: "110px" }}
        marginBottom={{ base: "20px", xl: "50px" }}
      >
        {!interactionsList.length && (
          <Text
            mb={{ base: "15px", xl: "50px" }}
            fontSize={{ base: "xs", xl: "md" }}
            lineHeight="140%"
            fontWeight="normal"
            color="primary"
            textAlign={{ xl: "center" }}
          >
            You have not had any interactions.
          </Text>
        )}
        <Link href="/athlete/interactions/post">
          <Button
            variant="secondary"
            w="full"
            fontSize={{ base: "md", xl: "xl" }}
            fontWeight="bold"
            lineHeight="140%"
          >
            Create new interaction
          </Button>
        </Link>
      </Box>

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={{ base: "3px", xl: "5px" }}
        justifyItems="center"
      >
        {interactionsList.length
          ? interactionsList.map((item) => (
              <GridItem borderRadius="4px" key={item?.id} w="full">
                <AspectRatio ratio={1} w="100%">
                  <Link
                    href={`/athlete/interactions/${item?.id}`}
                    style={{ borderRadius: "4px" }}
                  >
                    <If condition={item?.interactionMedia?.length > 0}>
                      <Then>
                        <If
                          condition={
                            item?.interactionMedia?.[0]?.type === "image"
                          }
                        >
                          <Then>
                            <Image
                              src={getImageLink(item?.interactionMedia[0]?.url)}
                              w="full"
                              h="full"
                              alt=""
                              objectFit="cover"
                              loading="lazy"
                            />
                          </Then>
                          <Else>
                            <Box
                              position="relative"
                              w="full"
                              h="full"
                              rounded="8px"
                            >
                              <video
                                src={getImageLink(
                                  item?.interactionMedia[0]?.url
                                )}
                                style={{
                                  borderRadius: "8px",
                                  width: "100%",
                                }}
                              />
                              <PlayVideoIcon
                                w={{ base: "30px", lg: "35px" }}
                                h={{ base: "30px", lg: "35px" }}
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%,-50%)"
                              />
                            </Box>
                          </Else>
                        </If>
                      </Then>
                      <Else>
                        <Box
                          display="flex"
                          justifyContent="center"
                          w="full"
                          h="full"
                          flexDirection="column"
                          paddingX={{ base: "11px", xl: "15px" }}
                          border="0.5px solid"
                          borderColor="#D9D9D9"
                          borderRadius="4px"
                        >
                          <Chat
                            w={{ base: "26px", xl: "32px" }}
                            h={{ base: "24px", xl: "32px" }}
                            marginBottom={{ base: "6px", xl: "10px" }}
                            color="primary"
                          />
                          <Text
                            fontSize={{ base: "10px", xl: "16px" }}
                            fontWeight="medium"
                            lineHeight="120%"
                            color="primary"
                          >
                            {item?.content.slice(0, 29).concat("...")}
                          </Text>
                        </Box>
                      </Else>
                    </If>
                  </Link>
                </AspectRatio>
              </GridItem>
            ))
          : ""}
      </Grid>
      {hasNextPage && (
        <Waypoint onEnter={onLoadMore}>
          <Box display="flex" justifyContent="center" mt={5}>
            <Spinner color="secondary" />
          </Box>
        </Waypoint>
      )}
    </Box>
  );
};
