import { useEffect, useState } from "react";
import { useGetMyListInteractionsQuery } from "@/api/athlete";
import { IInteractionItem } from "@/types/athlete/types";

interface IUseAthleteInteractionProps {
  isGetPublic?: boolean;
  take?: number;
}

export const useAthleteInteraction = ({
  isGetPublic = false,
  take = 10,
}: IUseAthleteInteractionProps) => {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [interactionsList, setInteractions] = useState<IInteractionItem[]>([]);
  const { data: interactionData, isFetching } = useGetMyListInteractionsQuery({
    page,
    take,
    order: "DESC",
    isGetPublic,
  });

  const onLoadMore = () => {
    if (interactionData?.meta?.hasNextPage && !isFetching) {
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    if (interactionData?.data && !isFetching) {
      setInteractions((prevArr) => [...prevArr, ...interactionData.data]);
      setLoading(false);
    }
  }, [interactionData]);

  return {
    isLoading,
    hasNextPage: interactionData?.meta?.hasNextPage,
    interactionsList,
    interactionData,
    onLoadMore,
  };
};
