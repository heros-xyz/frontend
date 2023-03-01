import { Icon, IconProps } from "@chakra-ui/react";

export const ChervonDown: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.25 6.875L10 13.125L3.75 6.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
