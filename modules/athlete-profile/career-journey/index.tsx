import { Box, Link } from "@chakra-ui/react";
import { useMemo } from "react";
import TimeLineJourney, { ITimeLineInfo } from "@/components/ui/Timeline";

interface ICareerJourneyProps {
  isEdit?: boolean;
  role?: "ATHLETE" | "FAN";
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
        return new Date(b.from).getTime() - new Date(a.from).getTime();
      });
    }

    return [];
  }, [data]);
  return (
    <Box pb={{ base: 16, xl: 8 }}>
      {isEdit && (
        <Link
          display="block"
          textDecoration="underline"
          color="secondary"
          fontSize={{ base: "xs", lg: "lg" }}
          mb="4"
          fontWeight="medium"
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
