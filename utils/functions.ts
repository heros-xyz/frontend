import dayjs, { UnitType } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IOption } from "@/types/globals/types";
import { INotificationInfo } from "@/types/notifications/types";
import { NotificationEventType } from "./enums";

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
  for (let i = end; i >= start; i--) {
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
  return arr;
};

export const monthOptions = [
  {
    label: "Dec",
    value: "12",
  },
  {
    label: "Nov",
    value: "11",
  },
  {
    label: "Oct",
    value: "10",
  },
  {
    label: "Sep",
    value: "09",
  },
  {
    label: "Aug",
    value: "08",
  },
  {
    label: "Jul",
    value: "07",
  },
  {
    label: "Jun",
    value: "06",
  },
  {
    label: "May",
    value: "05",
  },
  {
    label: "Apr",
    value: "04",
  },
  {
    label: "Mar",
    value: "03",
  },
  {
    label: "Feb",
    value: "02",
  },
  {
    label: "Jan",
    value: "01",
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

export const isValidString = (string: string) => {
  if (string) {
    const regex = new RegExp("^[a-zA]{0,}$");
    return regex.test(string.replace(/\s+/g, "").toLowerCase());
  }
  return false;
};

export const isBeforeEndDate = (startDate: string, endDate: string) => {
  const end = dayjs(endDate, "YYYY-MM-DD");
  return dayjs(startDate, "YYYY-MM-DD").isBefore(end);
};

export const filterSelectOptions = (
  candidate: { label: string; value: string },
  input: string
) => {
  if (input) {
    return candidate.label.toLowerCase().includes(input.toLowerCase());
  }

  return true;
};

export const getGender = (genderValue: number | undefined) => {
  switch (genderValue) {
    case 0:
      return "Male";
    case 1:
      return "FeMale";
    case 2:
      return "Other";
    default:
      break;
  }

  return "";
};

export const formatMoney = (money: number, showPrefix = true) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  if (showPrefix) {
    return formatter.format(money);
  }
  return new Intl.NumberFormat().format(money);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

export const getDateFromNow = (prevDate?: Date | string) => {
  if (!prevDate) return "";
  const formatPrevDate = new Date(prevDate).getTime();
  const diff = Number(new Date()) - formatPrevDate;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  switch (true) {
    case diff < minute:
      const seconds = Math.round(diff / 1000);
      return `${seconds} ${seconds > 1 ? "seconds" : "second"} ago`;
    case diff < hour:
      return Math.round(diff / minute) + "m ago";
    case diff < day:
      return Math.round(diff / hour) + "h ago";
    case diff < month:
      return Math.round(diff / day) + "d ago";
    case diff < year:
      return Math.round(diff / month) + "m ago";
    case diff > year:
      return Math.round(diff / year) + "y ago";
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

function getWordStr(str: string | undefined, numberWord: number) {
  if (!str) return "";
  return str.split(/\s+/).slice(0, numberWord).join(" ");
}

export const notificationContent = (notification?: INotificationInfo) => {
  if (!notification) return;

  let commentShort = "";
  const commentShortLength = notification.comment?.content?.split(" ").length;
  if (commentShortLength && commentShortLength > 10) {
    commentShort = getWordStr(notification.comment?.content, 10) + "...";
  } else {
    commentShort = notification.comment?.content ?? "";
  }

  switch (notification.type) {
    case NotificationEventType.FAN_LIKE_INTERACTION:
      return " has liked your interaction.";

    case NotificationEventType.FAN_SUBSCRIBE_ATHLETE:
      return ` has subscribed to you at ${"Bronze"} Tier.`;

    case NotificationEventType.FAN_COMMENT_INTERACTION:
      return " has commented on your interaction.";

    case NotificationEventType.FAN_LIKE_COMMENT:
      return ` has liked your comment.`;

    case NotificationEventType.FAN_LIKE_REPLY:
      return ` has liked your comment's reply. `;

    case NotificationEventType.FAN_LIKE_COMMENT:
      return ` has liked your comment. `;

    case NotificationEventType.FAN_REPLY_COMMENT:
      return ` has replied to your comment.`;

    case NotificationEventType.ATHLETE_NEW_INTERACTION:
      return " has made a new interaction.";

    case NotificationEventType.ATHLETE_COMMENT_INTERACTION:
      return " has commented on an interaction.";

    case NotificationEventType.ATHLETE_LIKE_INTERACTION:
      return " has liked on an interaction.";

    case NotificationEventType.ATHLETE_LIKE_COMMENT:
      return ` has liked your comment: "${commentShort}"`;

    case NotificationEventType.ATHLETE_REPLY_COMMENT:
      return ` has replied to your comment: "${commentShort}"`;

    case NotificationEventType.ATHLETE_LIKE_REPLY:
      return ` has liked your reply comment: "${commentShort}"`;

    case NotificationEventType.FAN_LIKE_FAN_COMMENT:
      return ` has liked your comment: "${commentShort}"`;

    case NotificationEventType.FAN_REPLY_FAN_COMMENT:
      return ` has replied your comment: "${commentShort}"`;

    case NotificationEventType.FAN_LIKE_FAN_REPLY:
      return ` has liked your reply comment: "${commentShort}"`;

    default:
      break;
  }
};

export const getLinkByNotificationType = (notification?: INotificationInfo) => {
  if (!notification) return;

  switch (notification.type) {
    case NotificationEventType.FAN_LIKE_INTERACTION:
      return `/athlete/interactions/${notification.interaction.id}`;

    case NotificationEventType.FAN_SUBSCRIBE_ATHLETE:
      return "/athlete/my-fan";

    case NotificationEventType.FAN_COMMENT_INTERACTION:
      return `/athlete/interactions/${notification.interaction.id}?commentId=${notification.comment?.id}`;

    case NotificationEventType.FAN_LIKE_COMMENT:
      return `/athlete/interactions/${notification.interaction.id}?commentId=${notification.comment?.id}`;

    case NotificationEventType.FAN_LIKE_REPLY:
      return `/athlete/interactions/${notification.interaction.id}?commentId=${notification.comment?.id}`;

    case NotificationEventType.FAN_REPLY_COMMENT:
      return `/athlete/interactions/${notification.interaction.id}?commentId=${notification.comment?.id}`;

    case NotificationEventType.FAN_LIKE_COMMENT:
      return `/athlete/interactions/${notification.interaction.id}?commentId=${notification.comment?.id}`;

    case NotificationEventType.ATHLETE_NEW_INTERACTION:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}`;

    case NotificationEventType.ATHLETE_COMMENT_INTERACTION:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}`;

    case NotificationEventType.ATHLETE_LIKE_INTERACTION:
      return " has liked on your interaction.";

    case NotificationEventType.ATHLETE_LIKE_COMMENT:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}&commentId=${notification.comment?.id}`;

    case NotificationEventType.ATHLETE_REPLY_COMMENT:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}&commentId=${notification.comment?.id}`;

    case NotificationEventType.ATHLETE_LIKE_REPLY:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}&commentId=${notification.comment?.id}`;

    case NotificationEventType.FAN_LIKE_FAN_COMMENT:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}&commentId=${notification.comment?.id}`;

    case NotificationEventType.FAN_REPLY_FAN_COMMENT:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}&commentId=${notification.comment?.id}`;

    case NotificationEventType.FAN_LIKE_FAN_REPLY:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}&commentId=${notification.comment?.id}`;

    default:
      break;
  }
};

export const getTime = (type: UnitType) => {
  const time = dayjs().get(type);
  if (+time < 10) {
    return `0${time}`;
  }
  return time;
};

export const urlToObject = async (
  image: string,
  name: string,
  type: string
) => {
  const response = await fetch(image, { mode: "no-cors" });

  const blob = await response.blob();
  const file = new File([blob], name, { type });

  return Promise.resolve(file);
};
