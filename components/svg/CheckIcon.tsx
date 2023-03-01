import { Icon, IconProps } from "@chakra-ui/react";

export const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      width="16px"
      height="12px"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7L5 11L15 1"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
