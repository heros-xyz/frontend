import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import updateLocale from "dayjs/plugin/updateLocale";
import isToday from "dayjs/plugin/isToday";
import { useUnmount } from "react-use";
import { INotificationInfo } from "@/types/notifications/types";
import {
  useGetListNotificationQuery,
  useMaskAllNotificationMutation,
} from "@/api/global";
import { useLoading } from "./useLoading";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export const useNotification = () => {
  const { start, finish } = useLoading();
  const [beforeDate, setBeforeDate] = useState<string | Date | undefined>(
    undefined
  );
  const [listNotification, setListNotification] = useState<INotificationInfo[]>(
    []
  );
  const {
    data: notificationData,
    isFetching,
    refetch,
  } = useGetListNotificationQuery({
    beforeDate,
    take: 10,
  });

  const [onMaskAll, { data: maskAllNotificationData }] =
    useMaskAllNotificationMutation();

  const onMaskAllNotification = async () => {
    start();
    try {
      await onMaskAll("").unwrap();
    } catch (error) {
      finish();
    }
  };

  const onRefetchNotificationList = async () => {
    setListNotification([]);
    setBeforeDate(undefined);

    setTimeout(async () => {
      await refetch().unwrap();
      finish();
    });
  };

  const onLoadMore = () => {
    if (!isFetching && notificationData?.meta?.hasNextPage) {
      const lastItem = notificationData?.data?.slice(-1)?.pop();
      setBeforeDate(lastItem?.createdAt);
    }
  };

  useEffect(() => {
    if (maskAllNotificationData) {
      onRefetchNotificationList();
    }
  }, [maskAllNotificationData]);

  useEffect(() => {
    if (notificationData?.data) {
      setListNotification((prev) => [...prev, ...notificationData?.data]);
    }
  }, [notificationData?.data]);

  const notificationGroup = useMemo(() => {
    const notificationOnToday: INotificationInfo[] = [];
    const notificationOnWeek: INotificationInfo[] = [];
    const notificationOnMonth: INotificationInfo[] = [];
    const notificationEarlier: INotificationInfo[] = [];

    if (listNotification) {
      dayjs.extend(isToday);
      const startWeek = dayjs().add(-7, "day");
      const startMonth = dayjs().add(-1, "month");
      const startThreeMonthAgo = dayjs().add(-3, "month");

      listNotification?.forEach((notification) => {
        if (dayjs(notification.createdAt).isToday()) {
          notificationOnToday.push(notification);
        } else if (dayjs(notification.createdAt).isAfter(startWeek)) {
          notificationOnWeek.push(notification);
        } else if (dayjs(notification.createdAt).isAfter(startMonth)) {
          notificationOnMonth.push(notification);
        } else if (dayjs(notification.createdAt).isAfter(startThreeMonthAgo)) {
          notificationEarlier.push(notification);
        }
      });
    }

    return {
      notificationOnToday,
      notificationOnWeek,
      notificationOnMonth,
      notificationEarlier,
    };
  }, [listNotification]);

  useUnmount(() => {
    setListNotification([]);
  });

  return {
    ...notificationGroup,
    listNotification,
    isFetching,
    hasMore: notificationData?.meta?.hasNextPage,
    onMaskAllNotification,
    onLoadMore,
  };
};
