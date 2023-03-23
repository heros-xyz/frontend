import {
  Box,
  Heading,
  Link,
  Text,
  Image,
  AspectRatio,
  Grid,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Else, If, Then } from "react-if";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import { IconMessage } from "@/components/svg/IconMessage";
import { ILatestInteraction } from "@/types/athlete/types";
import { getImageLink } from "@/utils/link";
import { PlayVideoIcon } from "@/components/svg/PlayVideoIcon";

interface FanInteractionsProps {
  titleHeading: string;
  actionText: string;
  items: ILatestInteraction[];
  isLoading: boolean;
}

const FanLatestInteractions: React.FC<FanInteractionsProps> = ({
  titleHeading,
  items,
  actionText = "view all",
  isLoading,
}) => {
  return (
    <Box bg="white" py="5">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: 5, lg: 7 }}
      >
        <Heading
          color="primary"
          fontWeight="bold"
          fontSize="xl"
          lineHeight="110%"
        >
          {titleHeading}
        </Heading>
        {items?.length ? (
          <Box borderBottom="1px" borderColor="grey.3">
            <Link
              as={NextLink}
              fontSize={{ base: "xs", lg: "md" }}
              fontWeight="medium"
              lineHeight="100%"
              color="grey.3"
              href="fan/interactions"
              textTransform="capitalize"
              mr="2"
              _hover={{ textDecoration: "none" }}
            >
              {actionText}
            </Link>
            <Link as={NextLink} href="fan/interactions">
              <IconArrowRight width="3" height="11" color="grey.3" />
            </Link>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <If condition={!isLoading}>
        <Then>
          {" "}
          {items?.length ? (
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gap="4"
              pb={4}
            >
              {items?.map((item, index) => (
                <Link
                  as={NextLink}
                  position="relative"
                  key={`${"item" + index}`}
                  cursor="pointer"
                  href={`/fan/athlete-profile/${item?.user?.id}/interaction?view=${item?.id}`}
                >
                  <AspectRatio ratio={10 / 12} w="full">
                    <Box
                      borderRadius="10"
                      bg="transparent"
                      overflow="hidden"
                      objectFit="cover"
                      borderWidth={{
                        base: `${
                          !item.interactionMedia?.[0]?.url ? "1px" : ""
                        }`,
                        lg: `${!item.interactionMedia?.[0]?.url ? "2px" : ""}`,
                      }}
                      borderColor={`${
                        !item.interactionMedia?.[0]?.url ? "secondary" : ""
                      }`}
                      w="full"
                      h="full"
                      position="relative"
                    >
                      {item.interactionMedia?.[0]?.url ? (
                        <If
                          condition={
                            item.interactionMedia?.[0]?.type === "image"
                          }
                        >
                          <Then>
                            <Image
                              src={getImageLink(
                                item.interactionMedia?.[0]?.url
                              )}
                              alt="heros item"
                              fallbackSrc="https://via.placeholder.com/150x200"
                              w="full"
                              h="full"
                              objectFit="cover"
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
                      ) : (
                        <>
                          <Box
                            position="absolute"
                            left="14.18px"
                            top={{ base: 4, lg: 6 }}
                            h="5"
                          >
                            <IconMessage
                              width={{ base: "22px", lg: "24px" }}
                              height="5"
                              color="secondary"
                            />
                          </Box>
                          <Text
                            position="absolute"
                            left="-25px"
                            top={{ base: "45px", lg: "55px" }}
                            bottom="auto"
                            transform="translate(50%, 0)"
                            color="secondary"
                            fontSize={{ base: "xxs", lg: "md" }}
                            fontWeight="medium"
                            lineHeight="120%"
                            width="20"
                            margin="auto"
                            textOverflow="ellipsis"
                            overflow="hidden"
                            wordBreak="break-word"
                          >
                            {item.content.length > 30
                              ? `${item.content.substring(0, 30)}...`
                              : item.content}
                          </Text>
                        </>
                      )}
                    </Box>
                  </AspectRatio>

                  <Box
                    w={{ base: "10", lg: "60px" }}
                    h={{ base: "10", lg: "60px" }}
                    borderRadius="full"
                    overflow="hidden"
                    objectFit="contain"
                    border="3px"
                    borderColor="secondary"
                    borderStyle="solid"
                    position="absolute"
                    left="auto"
                    right="50%"
                    bottom={{ base: "-16px", lg: "-28px" }}
                    transform="translate(50%, 0)"
                  >
                    <Image
                      alt="avatar"
                      src={getImageLink(item.user?.avatar)}
                      fallbackSrc="https://via.placeholder.com/150"
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                </Link>
              ))}
            </Box>
          ) : (
            <Box>
              <Text
                fontSize={{ base: "sm", xl: "md" }}
                color="primary"
                fontWeight="normal"
              >
                Subscribe to athletes, and you&apos;ll see their latest
                interactions here.
              </Text>
            </Box>
          )}
        </Then>
        <Else>
          <Grid
            templateColumns="repeat(3, 1fr)"
            columnGap={4}
            rowGap={{ base: 4, lg: 8 }}
          >
            <GridItem>
              <AspectRatio ratio={3 / 4}>
                <Skeleton rounded="md" />
              </AspectRatio>
            </GridItem>
            <GridItem>
              <AspectRatio ratio={3 / 4}>
                <Skeleton rounded="md" />
              </AspectRatio>
            </GridItem>
            <GridItem>
              <AspectRatio ratio={3 / 4}>
                <Skeleton rounded="md" />
              </AspectRatio>
            </GridItem>
          </Grid>
        </Else>
      </If>
    </Box>
  );
};

export default FanLatestInteractions;
