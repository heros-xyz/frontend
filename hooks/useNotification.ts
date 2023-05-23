import dayjs from "dayjs";
import { useMemo, } from "react";
import updateLocale from "dayjs/plugin/updateLocale";
import isToday from "dayjs/plugin/isToday";
import { useRouter } from "next/router";
import { params } from "firebase-functions/v1";
import { INotificationInfo } from "@/types/notifications/types";
import { useNotifications } from "@/libs/dtl/notification";
import { useLoading } from "./useLoading";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export const useNotification = () => {
  const { start, finish } = useLoading();
  const router = useRouter()
  const {
    data: notificationData,
    loading: isLoading,
    markAllAsRead
  } = useNotifications()

  const onMaskAllNotification = async () => {
    start();
    try {
      await markAllAsRead()
      finish();
    } catch (error) {
      router.reload()
      finish();
    }
  };

  const notificationGroup = useMemo(() => {
    const notificationOnToday: INotificationInfo[] = [];
    const notificationOnWeek: INotificationInfo[] = [];
    const notificationOnMonth: INotificationInfo[] = [];
    const notificationEarlier: INotificationInfo[] = [];

    if (notificationData) {
      dayjs.extend(isToday);
      const startWeek = dayjs().add(-7, "day");
      const startMonth = dayjs().add(-1, "month");
      const startThreeMonthAgo = dayjs().add(-3, "month");

      notificationData?.forEach((noti) => {
        const notification = {
          ...noti,
          type: noti?.eventType,
          interaction: {
            ...noti?.params?.interaction,
          },
          comment: {
            ...noti?.params?.comment,
          }
        } as INotificationInfo

        if (dayjs(notification.createdAt).isToday()) {
          notificationOnToday.push(notification);
        } else if (dayjs(notification?.createdAt).isAfter(startWeek)) {
          notificationOnWeek.push(notification);
        } else if (dayjs(notification?.createdAt).isAfter(startMonth)) {
          notificationOnMonth.push(notification);
        } else if (dayjs(notification?.createdAt).isAfter(startThreeMonthAgo)) {
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
  }, [notificationData]);

  console.log({ notificationData, notificationGroup })
  return {
    ...notificationGroup,
    listNotification: notificationData,
    isLoading,
    onMaskAllNotification,
    onLoadMore: () => { },
  };
};
