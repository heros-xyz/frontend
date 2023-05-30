import React, { useMemo, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Else, If, Then } from "react-if";
import AthletePost from "@/components/ui/AthletePost";
import AthleteInteractionComments from "@/components/ui/AthletePost/Comments";
import SkeletonInteractionDetail from "@/modules/athlete-interaction/components/detail/SkeletonInteractionDetail";
import BackButton from "@/components/ui/BackButton";
import { useAthleteProfile } from "@/libs/dtl/athleteProfile";
import { usePost } from "@/libs/dtl/post";

interface InteractionDetailProps {
  id: string;
  href?: string;
  isDetailPage?: boolean;
  onClose?: () => void;
}

const InteractionDetail: React.FC<InteractionDetailProps> = ({
  id,
  href,
  isDetailPage,
  onClose,
}) => {
  const router = useRouter();
  const post = usePost(id);
  const athleteProfile = useAthleteProfile(post.data?.uid);
  const [isFocusComment, setIsFocusComment] = useState(false);

  const loading = useMemo(
    () => athleteProfile.loading || post.loading,
    [athleteProfile.loading, post.loading]
  );

  const onClickBack = () => {
    onClose && onClose();
    if (isDetailPage && href) {
      router.push(href);
    } else if (href) {
      router.push(router.pathname, href, {
        shallow: true,
      });
    } else {
      router.back();
    }
  };

  if (athleteProfile.loading || post.loading) {
    return <></>;
  }

  return (
    <Container size={["base", "sm", "md", "lg", "xl"]}>
      <Box
        position={{ sm: "sticky", lg: "static" }}
        top={0}
        mx={{ base: -5, lg: 0 }}
        py={6}
        px={{ base: 5, lg: 0 }}
        zIndex={10}
        fontWeight="bold"
        bg="white"
      >
        <BackButton href={href} title="Interaction" onBack={onClickBack} />
      </Box>
      <Box>
        <If condition={!loading && post.data !== undefined}>
          <Then>
            {post.data && (
              <AthletePost
                id={post.data.id}
                onUpdated={() => {}}
                isDetailPage
                focusInputComment={setIsFocusComment}
              >
                <AthleteInteractionComments
                  id={id as string}
                  scrollToWhenCommented
                  focusComment={isFocusComment}
                  onUnFocusComment={setIsFocusComment}
                />
              </AthletePost>
            )}
          </Then>
          <Else>
            <Box mt={2}>
              <SkeletonInteractionDetail />
            </Box>
          </Else>
        </If>
      </Box>
    </Container>
  );
};

export default InteractionDetail;
