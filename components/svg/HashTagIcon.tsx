import { Icon, IconProps } from "@chakra-ui/react";

export const HashTagIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 17L8 1M10 17L14 1M3 6H17M1 12H15"
        stroke="#313F4C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
