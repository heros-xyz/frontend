export enum HttpErrorCode {
  // Auth sections -> start from 1000
  USER_NOT_REGISTERED = 1000,
  USER_ALREADY_REGISTERED = 1001,
  EXPIRED_OTP = 1002,
  INVALID_OTP = 1003,
  GOOGLE_TOKEN_INVALID = 1004,
  FACEBOOK_TOKEN_INVALID = 1005,
  TOKEN_INVALID = 1006,
  TOKEN_REVOKED = 1007,
  USER_ALREADY_REGISTERED_OTHER_ROLE = 1008,
  MUST_SIGN_UP_FIRST = 1009,

  // Interaction section -> start from 2000
  INTERACTION_NOT_FOUND = 2000,
}

export enum NotificationEventType {
  FAN_SUBSCRIBE_ATHLETE = "F_SUBSCRIBE", // A fan subscribes to an athlete's tier // Good
  FAN_LIKE_INTERACTION = "F_LIKE_INTERACTION", // A fan likes an athlete's interactions // Good
  FAN_COMMENT_INTERACTION = "F_COMMENT_INTERACTION", // A fan comments on an athlete's interaction // Good
  FAN_LIKE_COMMENT = "F_LIKE_COMMENT", // A fan likes an athlete's comment & A fan likes a comment's reply. // Good
  FAN_REPLY_COMMENT = "F_REPLY_COMMENT", // A fan replies to an athlete's comment // Good
  FAN_LIKE_REPLY = "F_LIKE_REPLY", // A fan replies to an athlete's comment // Good

  ATHLETE_NEW_INTERACTION = "A_NEW_INTERACTION", // An athlete posts a new interaction // Good
  ATHLETE_LIKE_INTERACTION = "A_LIKE_INTERACTION",
  ATHLETE_COMMENT_INTERACTION = "A_COMMENT_INTERACTION", // An athlete comments an interaction
  ATHLETE_LIKE_COMMENT = "A_LIKE_COMMENT", // An athlete likes fan's comment // Good
  ATHLETE_REPLY_COMMENT = "A_REPLY_COMMENT", // An athlete replies to fan's comment // Good
  ATHLETE_LIKE_REPLY = "A_LIKE_REPLY", // An athlete likes fan's comment's reply // Good

  FAN_LIKE_FAN_COMMENT = "F_LIKE_F_COMMENT", // Another fan likes fan's comment // Good
  FAN_REPLY_FAN_COMMENT = "F_REPLY_F_COMMENT", // Another fan replies to fan's comment // Good
  FAN_LIKE_FAN_REPLY = "F_LIKE_F_REPLY", // Another fan likes fan's comment's reply // Good
}

export enum CorporateWebsiteLink {
  TERM_AND_CONDITION = "term-of-service",
  PRIVACY_POLICY = "privacy-policy",
}
