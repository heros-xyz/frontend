import { Box, Heading, Link, Text, Image, AspectRatio } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import { IconMessage } from "@/components/svg/IconMessage";
import { ILatestInteraction } from "@/types/athlete/types";

interface FanInteractionsProps {
  titleHeading: string;
  actionText: string;
  items: ILatestInteraction[];
}

const FanLatestInteractions: React.FC<FanInteractionsProps> = ({
  titleHeading,
  items,
  actionText = "view all",
}) => {
  return (
    <Box bg="primary" py="5">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: 5, lg: 7 }}
      >
        <Heading
          color="acccent.3"
          fontWeight="bold"
          fontSize="xl"
          lineHeight="110%"
        >
          {titleHeading}
        </Heading>
        {items?.length ? (
          <Box borderBottom="1px" borderColor="secondary">
            <Link
              as={NextLink}
              fontSize={{ base: "xs", lg: "md" }}
              fontWeight="medium"
              lineHeight="100%"
              color="secondary"
              href="fan/interactions"
              textTransform="capitalize"
              mr="2"
              _hover={{ textDecoration: "none" }}
            >
              {actionText}
            </Link>
            <IconArrowRight width="3" height="11" color="secondary" />
          </Box>
        ) : (
          ""
        )}
      </Box>
      {items?.length ? (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="4" pb={4}>
          {items
            ?.slice(-3)
            .reverse()
            .map((item, index) => (
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
                      base: `${!item.interactionMedia?.[0]?.url ? "1px" : ""}`,
                      lg: `${!item.interactionMedia?.[0]?.url ? "2px" : ""}`,
                    }}
                    borderColor={`${
                      !item.interactionMedia?.[0]?.url ? "grey.100" : ""
                    }`}
                    w="full"
                    h="full"
                    position="relative"
                  >
                    {item.interactionMedia?.[0]?.url ? (
                      <Image
                        src={item.interactionMedia?.[0]?.url}
                        alt="heros item"
                        fallbackSrc="https://via.placeholder.com/150x200"
                        w="full"
                      />
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
                          wordBreak="break-all"
                          css={{
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.content}
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
                    src={item.user?.avatar}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </Box>
              </Link>
            ))}
        </Box>
      ) : (
        <Box>
          <Text
            fontSize={{ base: "sm", xl: "md" }}
            color="white"
            fontWeight="normal"
          >
            Subscribe to athletes, and you&apos;ll see their latest interactions
            here.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default FanLatestInteractions;
