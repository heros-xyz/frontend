import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import updateLocale from "dayjs/plugin/updateLocale";
import isToday from "dayjs/plugin/isToday";
import { useDispatch } from "react-redux";
import { INotificationInfo } from "@/types/notifications/types";
import {
	resetApiState,
	useGetListNotificationQuery,
	useMaskAllNotificationMutation,
} from "@/api/global";
import { useScrollToBottom } from "./useScrollToBottom";
import { useLoading } from "./useLoading";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
	weekStart: 1,
});

export const useNotification = () => {
	const dispatch = useDispatch()
	const { start, finish } = useLoading()
	const [olderThan, setOlderThan] = useState<string | Date | undefined>(
		undefined
	);
	const [take, setTake] = useState(10);
	const { isBottom } = useScrollToBottom();
	const { data: listNotification, isFetching, refetch } = useGetListNotificationQuery({
		olderThan,
		take,
	});

	const [onMaskAll, { data: maskAllNotificationData }] =
		useMaskAllNotificationMutation();

	const onMaskAllNotification = async () => {
		start()
		await onMaskAll("").unwrap();
	};

	const onRefetchNotificationList = async () => {
		await refetch().unwrap()
		finish()
	}

	useEffect(() => {
		if (isBottom && !isFetching && listNotification?.meta?.hasNextPage) {
			const lastItem = listNotification?.data?.slice(-1)?.pop();
			setTake(20);
			setOlderThan(lastItem?.createdAt);
		}
	}, [isBottom]);

	useEffect(() => {
		if (maskAllNotificationData) {
			onRefetchNotificationList()
		}
	}, [maskAllNotificationData])

	const notificationGroup = useMemo(() => {
		const notificationOnToday: INotificationInfo[] = [];
		const notificationOnWeek: INotificationInfo[] = [];
		const notificationOnMonth: INotificationInfo[] = [];
		const notificationEarlier: INotificationInfo[] = [];

		if (listNotification?.data) {
			dayjs.extend(isToday);
			const startWeek = dayjs().startOf("week");

			const startMonth = dayjs().startOf("month");
			listNotification?.data?.forEach((notification) => {
				if (dayjs(notification.createdAt).isToday()) {
					notificationOnToday.push(notification);
				} else if (dayjs(notification.createdAt).isAfter(startWeek)) {
					notificationOnWeek.push(notification);
				} else if (dayjs(notification.createdAt).isAfter(startMonth)) {
					notificationOnMonth.push(notification);
				} else {
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

	return {
		...notificationGroup,
		isFetching,
		onMaskAllNotification,
	};
};
