import { Icon, IconProps } from "@chakra-ui/react";

export const Menu: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H17M1 5H17M1 9H17M1 13H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
