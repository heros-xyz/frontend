import { Heading, Box, Link, Grid, GridItem } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import NextLink from "next/link";
import { If, Then } from "react-if";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import {
  useGetListAthleteRecommendedQuery,
  useGetListAthleteSubscribedQuery,
} from "@/api/fan";
import AthleteAvatar from "@/components/ui/AthleteAvatar";

const MyAthletes: FC = () => {
  const { data: listAthleteSubscribed, isSuccess } =
    useGetListAthleteSubscribedQuery({
      take: 3,
      page: 1,
    });
  const { data: listAthleteRecommended } = useGetListAthleteRecommendedQuery(
    {
      take: listAthleteSubscribed?.data?.length ? 2 : 3,
    },
    {
      skip: !isSuccess,
    }
  );

  const athleteList = useMemo(() => {
    let listAthleteRecommendedFormat = [];
    if (listAthleteSubscribed && listAthleteRecommended) {
      listAthleteRecommendedFormat = listAthleteRecommended?.map((item) => ({
        ...item,
        recommended: true,
      }));
      return listAthleteSubscribed?.data?.concat(listAthleteRecommendedFormat);
    }

    return [];
  }, [listAthleteSubscribed, listAthleteRecommended]);

  return (
    <Box bg="primary">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="5"
      >
        <Heading
          color="acccent.3"
          fontWeight="bold"
          fontSize="xl"
          lineHeight="110%"
        >
          My Athletes
        </Heading>
        <If condition={listAthleteSubscribed?.data?.length}>
          <Then>
            <Box borderBottom="1px" borderColor="secondary">
              <Link
                as={NextLink}
                fontSize={{ base: "xs", lg: "md" }}
                fontWeight="medium"
                lineHeight="100%"
                color="secondary"
                href="/fan/all-athletes"
                textTransform="capitalize"
                mr="2"
                _hover={{ textDecoration: "none" }}
              >
                View All
              </Link>
              <IconArrowRight width="3" height="11" color="secondary" />
            </Box>
          </Then>
        </If>
      </Box>
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
                name={athlete.fullName}
                isRecommend={athlete.recommended}
              />
            </NextLink>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default MyAthletes;
