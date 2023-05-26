import {
  Box,
  Container,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Else, If, Then } from "react-if";
import { useUpdateEffect } from "react-use";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormikContext } from "formik";
import { LoveIcon } from "@/components/svg/social/LoveIcon";
import { CommentIcon } from "@/components/svg/social/CommentIcon";
import { ShareIcon } from "@/components/svg/social/ShareIcon";
import InteractionsPost from "@/modules/athlete-interaction/components/post";
import { useUpdateInteractionInfo } from "@/modules/athlete-interaction/hooks";
import SocialSharing from "@/modules/athlete-profile/interactions/components/SocialSharing";
import { useReactions } from "@/libs/dtl/reaction";
import { usePost } from "@/libs/dtl/post";
import { useAthleteProfile } from "@/libs/dtl/athleteProfile";
import { CollectionPath } from "@/libs/dtl/types";
import AthleteInfo from "../AthleteInfo";
import type { MenuItem } from "../AthleteMenu";
import AthleteMenu from "../AthleteMenu";
import HerosSwiper from "../Swiper";
import DeletePostModal from "./Modal/Delete";

interface IAthletePostProps {
  children?: React.ReactNode;
  id: string;
  menuList?: MenuItem[];
  socialOrder?: boolean;
  isNavigate?: boolean;
  isDetailPage?: boolean;
  onDeleted?: () => void;
  onUpdated?: () => void;
  focusInputComment?: (value: boolean) => void;
}

const MAX_CONTENT_LENGTH = 200;

const AthletePost: React.FC<IAthletePostProps> = ({
  children,
  id,
  menuList,
  isNavigate,
  isDetailPage,
  focusInputComment,
                                                    onDeleted,onUpdated
}) => {
  const router = useRouter();
  const iconActions = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const { formik, handleSubmit, isLoading } = useUpdateInteractionInfo();
  const reactions = useReactions(id);
  const post = usePost(id)
  const athlete = useAthleteProfile(post.data?.uid)

  const handleClickMenu = (id: string) => {
    if (id === "delete") setIsOpenDelete(true);
    if (id === "edit") {
      router.push(`/athlete/interactions/post/${post?.data?.id}`);
    }
  };
  const handleSubmitUpdate = () => {
    handleSubmit();
  };

  useUpdateEffect(() => {
    if (!isLoading) {
      setIsOpenEdit(false);
      onUpdated && onUpdated();
    }
  }, [isLoading]);

  useEffect(() => {
    setTimeout(() => {
      if (iconActions && iconActions?.current && isDetailPage) {
        iconActions.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 250);
  }, []);

  const handleReaction = async () => {
    if (reactions.iLikeIt){
      await reactions.remove(id);
    }else{
      await reactions.create({
        to: id,
        toType: CollectionPath.POSTS,
        type_: "LIKE",
      });
    }
  };

  const ReadMore: React.FC<{ text?: string }> = ({ text = '' }) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);

    const toggleReadMore = (): void => {
      if (isNavigate) {
        router.push(`/athlete/interactions/${post?.data?.id}`);
      } else {
        setIsReadMore(!isReadMore);
      }
    };

    return (
      <If condition={!!text}>
        <Then>
          <Box
            fontSize={{ base: "sm", lg: "xl" }}
            color="primary"
            lineHeight={{ base: "21px", lg: "28px" }}
            wordBreak="break-word"
            mt={4}
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
              color="primary"
            >
              {text.length > MAX_CONTENT_LENGTH && isReadMore && "Read more"}
            </Text>
          </Box>
        </Then>
      </If>
    );
  };

  return (
    <Box h="100%">
      <Grid
        templateColumns={{
          base: "",
          lg: `${isDetailPage ? "repeat(9, 1fr)" : "repeat(1, 1fr)"}`,
        }}
      >
        <GridItem colSpan={4}>
          <Flex justifyContent="space-between" mb={{ base: 3, lg: 5 }}>
            <AthleteInfo
              athleteName={athlete.data?.nickName as string}
              imagePath={athlete.data?.avatar as string}
              publishDate={post.data?.publicDate}
              isSchedule={post?.data?.schedule}
            />
            <AthleteMenu onClickItem={handleClickMenu} menuList={menuList} />
          </Flex>

          <If condition={post.data?.media && post.data?.media?.length}>
            <Then>
              <Box maxW="calc(100vw - 40px)">
                <HerosSwiper slideData={post.data?.media} />
              </Box>
            </Then>
          </If>

          <Box mb={{ base: 2.5, lg: 4 }}>
            <If condition={!isDetailPage}>
              <Then>
                <ReadMore text={post.data?.content} />
              </Then>
              <Else>
                <Box
                  fontSize={{ base: "sm", lg: "xl" }}
                  color="primary"
                  lineHeight={{ base: "21px", lg: "28px" }}
                  wordBreak="break-word"
                  mt={4}
                >
                  <Text as="span" whiteSpace="break-spaces">
                    {post.data?.content}
                  </Text>
                </Box>
              </Else>
            </If>
          </Box>
          <If condition={post.data?.tags && post.data?.tags?.length}>
            <Then>
              <Flex
                flexWrap="wrap"
                gap={{ base: 3, lg: 4 }}
                mb={{ base: 2.5, lg: 4 }}
              >
                {post.data?.tags &&
                  post.data?.tags.map((tag) => (
                    <Tag
                      key={String(tag)}
                      size={{ base: "sm", lg: "lg" }}
                      borderRadius="full"
                      variant="solid"
                      bg="accent.2"
                      py={1}
                    >
                      <TagLabel
                        fontSize={{ base: "sm", lg: "lg" }}
                        color="white"
                        cursor="pointer"
                        onClick={() =>
                          router.push(
                            `/athlete/interactions/filter?tag=${tag}`
                          )
                        }
                      >
                        <>#{tag}</>
                      </TagLabel>
                    </Tag>
                  ))}
              </Flex>
            </Then>
          </If>
        </GridItem>
        <GridItem
          display={{ base: "none", lg: `${isDetailPage ? "flex" : "none"}` }}
          justifyContent="center"
          colSpan={1}
        >
          <Divider orientation="vertical" />
        </GridItem>
        <GridItem colSpan={4}>
          <Flex
            alignItems="center"
            mb={{ base: 2, lg: 3.5 }}
            ref={iconActions}
            pt={2}
            gap={5}
          >
            <LoveIcon
              cursor="pointer"
              width={{ base: "24px", lg: "32px" }}
              height={{ base: "24px", lg: "32px" }}
              fill={reactions.iLikeIt ? "currentcolor" : "none"}
              color={reactions.iLikeIt ? "accent.5" : "primary"}
              onClick={handleReaction}
            />

            <If condition={!!isDetailPage}>
              <Then>
                <CommentIcon
                  cursor="pointer"
                  width={{ base: "24px", lg: "32px" }}
                  height={{ base: "24px", lg: "32px" }}
                  color="primary"
                  onClick={() => focusInputComment && focusInputComment(true)}
                />
              </Then>
              <Else>
                <Link
                  href={`/athlete/interactions/${post?.data?.id}?focus=true`}
                >
                  <CommentIcon
                    width={{ base: "24px", lg: "32px" }}
                    height={{ base: "24px", lg: "32px" }}
                    color="primary"
                  />
                </Link>
              </Else>
            </If>
            <ShareIcon
              onClick={onOpen}
              cursor="pointer"
              width={{ base: "24px", lg: "32px" }}
              height={{ base: "24px", lg: "32px" }}
              color="primary"
            />
          </Flex>

          <Text
            order={1}
            fontWeight="medium"
            fontSize={{ base: "xs", lg: "lg" }}
            color="secondary"
          >
            {post.data?.reactionsCount} like(s), {post.data?.commentsCount || 0} comment(s)
          </Text>
          {children}
        </GridItem>
      </Grid>
      <Drawer
        isOpen={isOpenEdit}
        placement="top"
        onClose={() => setIsOpenEdit(false)}
      >
        <DrawerContent>
          <FormikContext.Provider value={formik}>
            <Box bg="primary" minHeight="100vh">
              <Container
                position="relative"
                size={["base", "sm", "md", "lg", "500px"]}
              >
                <InteractionsPost
                  isEdit
                  isLoading={isLoading}
                  handleSubmit={handleSubmitUpdate}
                  onBack={() => setIsOpenEdit(false)}
                />
              </Container>
            </Box>
          </FormikContext.Provider>
        </DrawerContent>
      </Drawer>
      <DeletePostModal
        postId={id as string}
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onDeleted={() => onDeleted && onDeleted()}
      />
      <SocialSharing
        postId={id as string}
        athleteId={post.data?.uid ?? ""}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default AthletePost;
