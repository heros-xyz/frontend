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
import AthleteAvatar from "@/components/ui/AthleteAvatar";
import { useUser } from "@/hooks/useUser";
import {
  useAthleteSubscribed,
  useGetListAthleteRecommended,
} from "@/libs/dtl/athleteProfile";

const MyAthletes: FC = () => {
  const { isAdmin, isFan } = useUser();

  const {
    data: listAthleteSubscribed,
    loading: getListAthleteSubscribedLoading,
  } = useAthleteSubscribed({ limitAmount: isFan ? 3 : 6 });

  const {
    data: listAthleteRecommended,
    loading: getListAthleteRecommendedLoading,
  } = useGetListAthleteRecommended({
    limitAmount:
      listAthleteSubscribed && listAthleteSubscribed?.length <= 3
        ? 6 - listAthleteSubscribed?.length
        : 3,
  });


  const athleteList = useMemo(() => {
    let listAthleteRecommendedFormat = [];

    if (isAdmin) {
      return listAthleteSubscribed;
    }

    if (listAthleteSubscribed && listAthleteRecommended) {
      listAthleteRecommendedFormat = listAthleteRecommended?.map((item) => ({
        ...item,
        recommended: true,
      }));

      const combined = listAthleteSubscribed?.concat(
        listAthleteRecommendedFormat
      );

      return combined.filter((profile, index) => {
        return index === combined.findIndex((item) => item.id === profile.id);
      });
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
                <NextLink href={`/fan/athlete-profile/${athlete.id}`}>
                  <AthleteAvatar
                    imageUrl={athlete.avatar}
                    name={athlete.nickName}
                    isRecommend={athlete?.recommended ?? false}
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
