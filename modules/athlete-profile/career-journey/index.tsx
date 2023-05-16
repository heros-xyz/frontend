import { Box, Link } from "@chakra-ui/react";
import { useMemo } from "react";
import NextLink from "next/link";
import TimeLineJourney, { ITimeLineInfo } from "@/components/ui/Timeline";

interface ICareerJourneyProps {
  isEdit?: boolean;
  role?: "ATHLETE" | "FAN" | "ADMIN";
  data: ITimeLineInfo[] | undefined;
}

const CareerJourney: React.FC<ICareerJourneyProps> = ({
  data,
  isEdit = true,
}) => {
  const sortData = useMemo(() => {
    if (data) {
      const newArr = [...data];
      return newArr?.sort(function (a, b) {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });
    }

    return [];
  }, [data]);
  return (
    <Box pb={8}>
      {isEdit && (
        <Link
          as={NextLink}
          display="block"
          textDecoration="underline"
          color="grey.200"
          fontSize={{ base: "xs", lg: "lg" }}
          mb="4"
          fontWeight="medium"
          href="/athlete/my-profile/edit-journey"
        >
          Edit Journey
        </Link>
      )}
      <TimeLineJourney
        items={sortData || []}
        isAddJourney={false}
        bgColor="primary"
      />
    </Box>
  );
};

export default CareerJourney;
