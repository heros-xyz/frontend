import { Icon, IconProps } from "@chakra-ui/react";

export const Close: React.FC<IconProps> = (props) => {
  return (
    <Icon
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 11L11 1M1 1L11 11"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
