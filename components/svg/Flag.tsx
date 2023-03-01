import { Icon, IconProps } from "@chakra-ui/react";

export const FlagIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 16.5V13.1667M1.5 13.1667V3.16667C1.5 2.24619 2.24619 1.5 3.16667 1.5H8.58333L9.41667 2.33333H16.5L14 7.33333L16.5 12.3333H9.41667L8.58333 11.5H3.16667C2.24619 11.5 1.5 12.2462 1.5 13.1667ZM9 1.91667V6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
