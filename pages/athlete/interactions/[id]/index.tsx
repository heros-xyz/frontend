import React, { useEffect, useMemo } from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import { useGetInteractionDetailQuery } from "@/api/athlete";
import AthletePost from "@/components/ui/AthletePost";
import AthleteInteractionComments from "@/components/ui/AthletePost/Comments";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { DeleteIcon } from "@/components/svg/menu/DeleteIcon";

const InteractionDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: postInfo } = useGetInteractionDetailQuery(id as string, {
    skip: typeof id !== "string" || !Boolean(id),
  });

  useEffect(() => {
    window.scrollTo({
      top: window.screen.availHeight,
      behavior: "smooth",
    });
  }, []);

  const formatPropAthletePost = useMemo(
    () => ({
      id: postInfo?.id,
      menuList: [
        { id: "edit", itemName: "Edit", Icon: <EditIcon /> },
        { id: "delete", itemName: "Delete", Icon: <DeleteIcon /> },
      ],
      athleteInfo: {
        imagePath: postInfo?.user?.avatar || "",
        athleteName: `${postInfo?.user?.firstName} ${postInfo?.user?.lastName}`,
        publishDate: postInfo?.user?.createdAt || "",
      },
      // slideData: postInfo?.interactionMedia.map((item) => item.url) || [],
      slideData: postInfo?.interactionMedia.length
        ? [
            "https://cdn.britannica.com/84/139484-050-D91679CC/Michael-Ballack-Germany-Italy-Cristian-Zaccardo-March-1-2006.jpg",
            "https:images.squarespace-cdn.com/content/v1/60228b2d4248e2593057e4f5/1612878448762-KT4KAT3KPIKG07A4JXU7/iStock-954142740.jpg?format=2500w",
          ]
        : [],
      socialOrder: true,
      hashtag: postInfo?.tags || [],
      postLikes: postInfo?.reactionCount || 0,
      postComments: postInfo?.commentCount || 0,
      postContent: postInfo?.content || "",
      liked: postInfo?.liked || false,
    }),
    [postInfo]
  );

  return (
    <Box bg="primary" minHeight="100vh">
      <Head>
        <title>Athlete | Interaction Details</title>
      </Head>
      <Box w="full" px={{ base: 5, lg: "10%" }}>
        <Box
          bg="primary"
          position={{ sm: "sticky", lg: "static" }}
          top={0}
          mx={{ base: -5, lg: 0 }}
          py={6}
          px={{ base: 5, lg: 0 }}
          zIndex={10}
        >
          <Flex
            alignItems="center"
            gap={3}
            cursor="pointer"
            onClick={() => router.push("/athlete/interactions")}
          >
            <ArrowLeft />
            <Text
              fontFamily="heading"
              fontSize={{ base: "xl", lg: "2xl" }}
              color="white"
            >
              Interaction
            </Text>
          </Flex>
        </Box>
        <Box>
          <AthletePost {...formatPropAthletePost}>
            <AthleteInteractionComments id={id as string} />
          </AthletePost>
        </Box>
      </Box>
    </Box>
  );
};

export default InteractionDetail;
