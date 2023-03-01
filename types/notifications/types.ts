export interface ISource {
  id: string;
  avatar: string;
  fullName: string;
}

export interface IComment {
  id: string;
  content: string;
  userId: string;
  createdAt: string | Date;
}

export interface IInteraction {
  id: string;
  content: string;
}
export interface INotificationInfo {
  id: string;
  type: string;
  message: string;
  source: ISource;
  interaction: IInteraction;
  comment?: IComment;
  readAt?: Date | string | null;
  createdAt?: Date | string;
}
