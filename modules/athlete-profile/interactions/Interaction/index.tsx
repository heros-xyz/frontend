import {
  AspectRatio,
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Else, If, Then } from "react-if";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import { useRouter } from "next/router";
import { useLocation, useLockBodyScroll } from "react-use";
import { useState } from "react";
import { Provider as BusProvider } from "react-bus";
import Chat from "@/components/svg/Chat";
import { getImageLink } from "@/utils/link";
import { PlayVideoIcon } from "@/components/svg/PlayVideoIcon";
import { useAthleteInteraction } from "@/hooks/useAthleteInteraction";
import InteractionInModal from "@/modules/athlete-interaction/components/detail/InteractionInModal";
import HerosVideo from "@/components/ui/HerosVideo";
import { usePostsAsMaker } from "@/libs/dtl/post";

export const Interaction = ({}) => {
  const router = useRouter();
  const route = useLocation();
  const [interactionId, setInteractionId] = useState("");
  const {
    isOpen: isOpenViewOnList,
    onOpen: onOpenViewOnList,
    onClose: closeOpenViewOnList,
  } = useDisclosure();

  useLockBodyScroll(isOpenViewOnList);

  /*
  const { hasNextPage, interactionsList, onLoadMore } = useAthleteInteraction({
    isGetPublic: true,
    take: 15,
  });
  */
  // TODO: has next and onLoadMore
  const { hasNextPage, onLoadMore } = {
    hasNextPage: false,
    onLoadMore: () => {},
  };
  const { data: interactionsList, loading } = usePostsAsMaker();

  const onViewInteractionDetail = (id: string) => {
    setInteractionId(id);

    router
      .push(route.pathname as string, `/athlete/interactions/${id}?current=1`, {
        shallow: true,
      })
      .then(() => {
        onOpenViewOnList();
      });
  };

  if (loading) return null;

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
        {interactionsList?.length
          ? interactionsList.map((item) => (
              <GridItem borderRadius="4px" key={item?.id} w="full">
                <AspectRatio ratio={1} w="100%">
                  <Box
                    style={{ borderRadius: "4px" }}
                    cursor="pointer"
                    onClick={() => onViewInteractionDetail(item.id)}
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
                              src={item?.interactionMedia?.[0]?.url}
                              w="full"
                              h="full"
                              alt=""
                              objectFit="cover"
                              fallback={
                                <Box
                                  rounded="10px"
                                  w="full"
                                  h="full"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  bg="grey.0"
                                >
                                  <Spinner color="accent.2" size="sm" />
                                </Box>
                              }
                            />
                          </Then>
                          <Else>
                            <Box
                              position="relative"
                              w="full"
                              h="full"
                              rounded="8px"
                            >
                              <HerosVideo
                                url={item?.interactionMedia?.[0]?.url}
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
                  </Box>
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

      <BusProvider>
        <InteractionInModal
          onClose={closeOpenViewOnList}
          interactionId={interactionId}
          href="/athlete/my-profile?current=1"
          isOpen={isOpenViewOnList}
        />
      </BusProvider>
    </Box>
  );
};
