import { Icon, IconProps } from "@chakra-ui/react";

export const WalletIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="26" cy="26" r="26" fill="#FFC0F0" />
      <path
        d="M14 23.3332H38M19.3333 29.9998H20.6667M26 29.9998H27.3333M18 35.3332H34C36.2091 35.3332 38 33.5423 38 31.3332V20.6665C38 18.4574 36.2091 16.6665 34 16.6665H18C15.7909 16.6665 14 18.4574 14 20.6665V31.3332C14 33.5423 15.7909 35.3332 18 35.3332Z"
        stroke="#1E16C1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
