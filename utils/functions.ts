import { INotificationInfo } from "@/types/notifications/types";
import { NotificationEventType } from "./enums";

export const isValidString = (string: string) => {
  if (string) {
    const regex = new RegExp("^[a-zA]{0,}$");
    return regex.test(string.replace(/\s+/g, "").toLowerCase());
  }
  return false;
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
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}&commentId=${notification.comment?.id}`;

    case NotificationEventType.ATHLETE_LIKE_INTERACTION:
      return `/fan/athlete-profile/${notification.source.id}/interaction?view=${notification.interaction.id}`;

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


export const isEmptyObject = (obj: Object) => {
  return JSON.stringify(obj) === '{}';
}

