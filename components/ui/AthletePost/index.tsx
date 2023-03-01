import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Else, If, Then } from "react-if";
import { useUpdateEffect } from "react-use";
import { useRouter } from "next/router";
import Link from "next/link";
import { ITags } from "@/types/athlete/types";
import { LoveIcon } from "@/components/svg/social/LoveIcon";
import { CommentIcon } from "@/components/svg/social/CommentIcon";
import { ShareIcon } from "@/components/svg/social/ShareIcon";
import { useReactionInteractionMutation } from "@/api/fan";
import AthleteInfo, { AthleteInfoProps } from "../AthleteInfo";
import type { MenuItem } from "../AthleteMenu";
import AthleteMenu from "../AthleteMenu";
import HerosSwiper from "../Swiper";
import DeletePostModal from "./Modal/Delete";

interface IAthletePostProps {
  children?: React.ReactNode;
  id: string | string[] | undefined;
  menuList?: MenuItem[];
  athleteInfo: AthleteInfoProps;
  postLikes: number;
  postComments: number;
  hashtag?: ITags[];
  postContent: string;
  socialOrder: boolean;
  slideData: string[];
  liked: boolean;
  isNavigate?: boolean;
  interactionId?: string;
  onDeleted?: () => void;
}

const MAX_CONTENT_LENGTH = 200;

const AthletePost: React.FC<IAthletePostProps> = ({
  children,
  id,
  menuList,
  athleteInfo,
  postLikes,
  postComments,
  hashtag,
  postContent,
  slideData,
  liked,
  isNavigate,
  interactionId,
  onDeleted,
}) => {
  const router = useRouter();
  const { id: isDetail } = router.query;

  const [reaction, setReaction] = useState<boolean>(liked);
  const [totalReaction, setTotalReaction] = useState<number>(postLikes);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [submit, { data: reactionData }] = useReactionInteractionMutation();
  const handleClickMenu = (id: string) => {
    if (id === "delete") setIsOpenDelete(true);
  };

  useUpdateEffect(() => {
    setReaction(liked);
    setTotalReaction(postLikes);
  }, [liked, postLikes]);

  useUpdateEffect(() => {
    if (reactionData) {
      setTotalReaction(reactionData.totalReaction);
    }
  }, [reactionData]);
  const handleReaction = async () => {
    await submit({
      reactionType: 1,
      interactionId: id,
    });
    setReaction(!reaction);
  };

  const ReadMore: React.FC<{ text: string }> = ({ text }) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);

    const toggleReadMore = (): void => {
      if (isNavigate) {
        router.push(`/athlete/interactions/${interactionId}`);
      } else {
        setIsReadMore(!isReadMore);
      }
    };

    return (
      <If condition={!!text}>
        <Then>
          <Box
            fontSize={{ base: "sm", lg: "xl" }}
            color="white"
            lineHeight="19.6px"
            wordBreak="break-all"
          >
            <Text as="span" whiteSpace="break-spaces">
              {isReadMore && text.length > MAX_CONTENT_LENGTH
                ? `${text.slice(0, MAX_CONTENT_LENGTH)}...`
                : text}
            </Text>
            <Text
              as="span"
              onClick={toggleReadMore}
              cursor="pointer"
              color="secondary"
              textDecoration="underline"
            >
              {text.length > MAX_CONTENT_LENGTH && isReadMore && "Read more"}
            </Text>
          </Box>
        </Then>
      </If>
    );
  };

  return (
    <Box bg="primary" h="100%">
      <Grid
        templateColumns={{
          base: "",
          lg: `${isDetail ? "repeat(9, 1fr)" : "repeat(1, 1fr)"}`,
        }}
        gap={{ base: 6, lg: `${isDetail ? 0 : 6}` }}
      >
        <GridItem colSpan={4}>
          <Flex justifyContent="space-between" mb={{ base: 3, lg: 5 }}>
            <AthleteInfo {...athleteInfo} />
            <AthleteMenu onClickItem={handleClickMenu} menuList={menuList} />
          </Flex>

          <If condition={slideData && slideData.length}>
            <Then>
              <Box maxW="calc(100vw - 40px)">
                <HerosSwiper slideData={slideData} />
              </Box>
            </Then>
          </If>

          <Box mb={{ base: 2.5, lg: 5 }}>
            <If condition={!isDetail}>
              <Then>
                <ReadMore text={postContent} />
              </Then>
              <Else>
                <Box
                  fontSize={{ base: "sm", lg: "xl" }}
                  color="white"
                  lineHeight="19.6px"
                  wordBreak="break-all"
                >
                  <Text as="span" whiteSpace="break-spaces">
                    {postContent}
                  </Text>
                </Box>
              </Else>
            </If>
          </Box>
          <If condition={hashtag && hashtag.length}>
            <Then>
              <Box>
                {hashtag &&
                  hashtag.map((item) => (
                    <Tag
                      key={item.id}
                      size={{ base: "sm", lg: "lg" }}
                      borderRadius="full"
                      variant="solid"
                      bg="acccent.2"
                      ml={{ base: 3, lg: 4 }}
                      _first={{ ml: 0 }}
                    >
                      <TagLabel fontSize="sm" color="white" cursor="pointer">
                        #{item.name}
                      </TagLabel>
                    </Tag>
                  ))}
              </Box>
            </Then>
          </If>
        </GridItem>
        <GridItem
          display={{ base: "none", lg: `${isDetail ? "flex" : "none"}` }}
          justifyContent="center"
          colSpan={1}
        >
          <Divider orientation="vertical" />
        </GridItem>
        <GridItem colSpan={4}>
          <Flex alignItems="center" mb={{ base: 2, lg: 3.5 }}>
            <LoveIcon
              w={5}
              color={reaction ? "acccent.1" : "white"}
              fill={reaction ? "currentcolor" : "none"}
              onClick={handleReaction}
              cursor="pointer"
            />
            <Link href={`/athlete/interactions/${interactionId}`}>
              <CommentIcon cursor="pointer" ml={5} maxW={6} />
            </Link>
            <ShareIcon cursor="pointer" ml={5} maxW={6} maxH={5} />
          </Flex>

          <Text
            order={1}
            fontWeight="medium"
            fontSize={{ base: "xs", lg: "lg" }}
            color="acccent.1"
          >
            {totalReaction} like(s), {postComments} comment(s)
          </Text>
          {children}
        </GridItem>
      </Grid>
      <DeletePostModal
        postId={id as string}
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onDeleted={() => onDeleted && onDeleted()}
      />
    </Box>
  );
};

export default AthletePost;
