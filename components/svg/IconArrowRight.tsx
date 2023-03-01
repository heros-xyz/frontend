import { Icon, IconProps } from "@chakra-ui/react";

export const IconArrowRight: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.5L11 5.5M11 5.5L6.5 1M11 5.5L6.5 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
