import dayjs, { UnitType } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IOption } from "@/types/globals/types";


export const generateOptions = (type: string) => {
	const arr: Array<IOption> = [];
	let start = 0;
	let end = 0;
	switch (type) {
		case "day":
			start = 1;
			end = 31;
			break;
		case "month":
			start = 1;
			end = 12;
			break;
		case "year":
			start = 1900;
			end = new Date().getFullYear();
			break;
	}
	if (type === 'year') {
		for (let i = end; i >= start; i--) {
			const value = i < 10 ? `0${i}` : `${i}`;
			const option: IOption = { value, label: `${i}` };
			arr.push(option);
		}
	} else {
		for (let i = start; i <= end; i++) {
			const value = i < 10 ? `0${i}` : `${i}`;
			const option: IOption = { value, label: `${i}` };
			if (type === "month") {
				const date = new Date();
				date.setMonth(+option.label - 1);
				option.label = date.toLocaleString("en-US", {
					month: "short",
				});
			}
			arr.push(option);
		}
	}
	return arr;
};

export const monthOptions = [
	{
		label: "Jan",
		value: "01",
	},
	{
		label: "Feb",
		value: "02",
	},
	{
		label: "Mar",
		value: "03",
	},
	{
		label: "Apr",
		value: "04",
	},
	{
		label: "May",
		value: "05",
	},
	{
		label: "Jun",
		value: "06",
	},
	{
		label: "Jul",
		value: "07",
	},
	{
		label: "Aug",
		value: "08",
	},
	{
		label: "Sep",
		value: "09",
	},
	{
		label: "Oct",
		value: "10",
	},
	{
		label: "Nov",
		value: "11",
	},
	{
		label: "Dec",
		value: "12",
	},
];

export const isValidDate = (
	date: string | Date | undefined,
	format?: string
) => {
	const dateFormat = format ? format : "YYYY-MM-DD";
	dayjs.extend(customParseFormat);

	return dayjs(date, dateFormat, true).isValid();
};

export const isBeforeEndDate = (
	startDate: string,
	endDate: string,
	format?: string
) => {
	const formatDate = format ?? "YYYY-MM-DD";
	const end = dayjs(endDate, formatDate);
	return dayjs(startDate, formatDate).isBefore(end);
};

export const getDateFromNow = (prevDate?: Date | string) => {
	if (!prevDate) return "";
	const formatPrevDate = new Date(prevDate).getTime();
	const diff = Number(new Date()) - formatPrevDate;
	const minute = 60 * 1000;
	const hour = minute * 60;
	const day = hour * 24;
	const diffDay = dayjs(new Date()).diff(prevDate, "day");

	switch (true) {
		case diff < minute:
			const seconds = Math.round(diff / 1000);
			return `${seconds}s ago`;
		case diff < hour:
			return Math.round(diff / minute) + "m ago";
		case diff < day:
			return Math.round(diff / hour) + "h ago";
		case diffDay < 7:
			return Math.round(diff / day) + "d ago";
		case diffDay >= 7 && diffDay <= 10:
			return "1w ago";
		case diffDay >= 10:
			return dayjs(prevDate).format('DD/MM/YYYY');
		default:
			return "";
	}
};

export const convertDateFromNow = (prevDate?: Date | string) => {
	if (!prevDate) return "";
	const diffMin = dayjs(new Date()).diff(prevDate, "minute");
	const diffHour = dayjs(new Date()).diff(prevDate, "hour");
	const diffDay = dayjs(new Date()).diff(prevDate, "day");
	const diffWeek = dayjs(new Date()).diff(prevDate, "week");

	switch (true) {
		case diffMin < 60:
			return `${diffMin === 0 ? 1 : diffMin}m ago`;
		case diffMin >= 60 && diffHour < 24:
			return `${diffHour}h ago`;
		case diffHour >= 24 && diffDay < 7:
			return `${diffDay}d ago`;
		case diffDay >= 7:
			return `${diffWeek}w ago`;
		default:
			break;
	}
};

export const convertTimeUnit = (unit: string) => {
	const str = unit.replace(/[0-9]/g, '');
	const timeNumber = unit.replace(str, "");
	let timeCount = 0;
	switch (str) {
		case "y":
			timeCount = Number(timeNumber) * 60 * 60 * 24 * 365 * 1000; // x years
			break;
		case "m":
			timeCount = Number(timeNumber) * 60 * 60 * 24 * 30 * 1000; // x months
			break;
		case "d":
			timeCount = Number(timeNumber) * 60 * 60 * 24 * 1000; // x days
			break;
		case "hrs":
			timeCount = Number(timeNumber) * 60 * 60 * 1000; // x hours
			break;
		case "min":
			timeCount = Number(timeNumber) * 60 * 1000; // x minutes
			break;
		case "sec":
			timeCount = Number(timeNumber) * 1000; // x seconds
			break;
		default:
			break;
	}

	return new Date().getTime() + timeCount;
};

export const getTime = (type: UnitType) => {
	const time = dayjs().get(type);
	if (+time < 10) {
		return `0${time}`;
	}
	return time;
};