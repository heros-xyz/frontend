import { Icon, IconProps } from "@chakra-ui/react";

export const ArrowLeft: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.25 7L0.75 7M0.75 7L6.375 1.375M0.75 7L6.375 12.625"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
