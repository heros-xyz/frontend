import {
  Heading,
  Box,
  Link,
  Grid,
  GridItem,
  SkeletonCircle,
  AspectRatio,
} from "@chakra-ui/react";
import { FC, useMemo } from "react";
import NextLink from "next/link";
import { Else, If, Then } from "react-if";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import {
  useGetListAthleteRecommendedQuery,
  useGetListAthleteSubscribedQuery,
} from "@/api/fan";
import AthleteAvatar from "@/components/ui/AthleteAvatar";
import { useUser } from "@/hooks/useUser";

const MyAthletes: FC = () => {
  const { isAdmin, isFan } = useUser();
  const {
    data: listAthleteSubscribed,
    isSuccess,
    isLoading: getListAthleteSubscribedLoading,
  } = useGetListAthleteSubscribedQuery({
    take: isFan ? 3 : 6,
    page: 1,
  });

  const {
    data: listAthleteRecommended,
    isLoading: getListAthleteRecommendedLoading,
  } = useGetListAthleteRecommendedQuery(
    {
      take:
        listAthleteSubscribed?.data && listAthleteSubscribed?.data?.length <= 3
          ? 6 - listAthleteSubscribed?.data?.length
          : 3,
    },
    {
      skip: !isSuccess || isAdmin,
    }
  );

  const athleteList = useMemo(() => {
    let listAthleteRecommendedFormat = [];

    if (isAdmin) {
      return listAthleteSubscribed?.data;
    }

    if (listAthleteSubscribed && listAthleteRecommended) {
      listAthleteRecommendedFormat = listAthleteRecommended?.data?.map(
        (item) => ({
          ...item,
          recommended: true,
        })
      );
      return listAthleteSubscribed?.data?.concat(listAthleteRecommendedFormat);
    }

    return [];
  }, [listAthleteSubscribed, listAthleteRecommended]);

  return (
    <Box bg="white">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="5"
      >
        <Heading
          color="primary"
          fontWeight="bold"
          fontSize="xl"
          lineHeight="110%"
        >
          My Athletes
        </Heading>

        <Box borderBottom="1px" borderColor="grey.300">
          <Link
            as={NextLink}
            fontSize={{ base: "xs", lg: "md" }}
            fontWeight="medium"
            lineHeight="100%"
            color="grey.300"
            href="/fan/all-athletes"
            textTransform="capitalize"
            mr="2"
            _hover={{ textDecoration: "none" }}
          >
            View All
          </Link>
          <Link as={NextLink} href="/fan/all-athletes">
            <IconArrowRight width="3" height="11" color="grey.300" />
          </Link>
        </Box>
      </Box>
      <If
        condition={
          !getListAthleteSubscribedLoading && !getListAthleteRecommendedLoading
        }
      >
        <Then>
          <Grid
            templateColumns="repeat(3, 1fr)"
            columnGap={4}
            rowGap={{ base: 4, lg: 8 }}
          >
            {athleteList?.map((athlete, index) => (
              <GridItem key={athlete.id + `${index}`}>
                <NextLink
                  href={`/fan/athlete-profile/${
                    athlete.athleteId || athlete.id
                  }`}
                >
                  <AthleteAvatar
                    imageUrl={athlete.avatar}
                    name={athlete.nickName}
                    isRecommend={athlete.recommended}
                  />
                </NextLink>
              </GridItem>
            ))}
          </Grid>
        </Then>
        <Else>
          <Grid
            templateColumns="repeat(3, 1fr)"
            columnGap={4}
            rowGap={{ base: 4, lg: 8 }}
          >
            <GridItem>
              <AspectRatio ratio={1}>
                <SkeletonCircle />
              </AspectRatio>
            </GridItem>
            <GridItem>
              <AspectRatio ratio={1}>
                <SkeletonCircle />
              </AspectRatio>
            </GridItem>
            <GridItem>
              <AspectRatio ratio={1}>
                <SkeletonCircle />
              </AspectRatio>
            </GridItem>
            <GridItem>
              <AspectRatio ratio={1}>
                <SkeletonCircle />
              </AspectRatio>
            </GridItem>
            <GridItem>
              <AspectRatio ratio={1}>
                <SkeletonCircle />
              </AspectRatio>
            </GridItem>
            <GridItem>
              <AspectRatio ratio={1}>
                <SkeletonCircle />
              </AspectRatio>
            </GridItem>
          </Grid>
        </Else>
      </If>
    </Box>
  );
};

export default MyAthletes;
