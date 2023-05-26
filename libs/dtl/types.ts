import { Timestamp } from "firebase/firestore";

export enum CollectionPath {
  NOTIFICATIONS = "notification",
  ATHLETE_PROFILE = "athleteProfile",
  COMMENTS = "comments",
  USER = "user",
  POSTS = "post",
  FAN_PROFILE = "fanProfile"
}

export interface Comment {
  id?: string //Conversion attribute
  post: string
  content: string
  parent?: string
  author: string
  authorProfile: FanProfile | AthleteProfile
  authorProfileCollection: CollectionPath
  commentsCount: number
  reactionsCount: number
  createdAt: Timestamp
  deletedAt?: Timestamp
}

export interface FanProfile {
  avatar?: string
  uid?: string
  sports?: {
    key: string
    label: string
  }[]
  nickName?: string
  fullName: string
  firstName: string
  lastName: string
}

export interface Nationality {
  name: string;
  code: string;
  phoneCode?: string;
  twoLetterCode?: string;
  threeLetterCode?: string;
}

export interface AthleteProfile {
  id: string,
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  goal: string;
  currentTeam: string;
  totalSubCount: number
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  gender: string
  fullName: string
  nickName: string;
  story: string;
  dateOfBirth: Date
  sport: {
    label: string
    key: string
  };
  tagline: string;
  tags: string[];
  uid: string;
  nationality: Nationality
  totalInteractionCount: number
  recommended?: boolean
  isFinishOnboarding?: boolean
}
