import { Icon, IconProps } from "@chakra-ui/react";

export const WarningIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.00027 6.5V8.16667M9.00027 11.5H9.00861M3.22677 14.8333H14.7738C16.0568 14.8333 16.8587 13.4444 16.2172 12.3333L10.4436 2.33333C9.80215 1.22222 8.1984 1.22222 7.5569 2.33333L1.78339 12.3333C1.14189 13.4444 1.94377 14.8333 3.22677 14.8333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
