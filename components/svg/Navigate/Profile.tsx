import { Icon, IconProps } from "@chakra-ui/react";

export const ProfileIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3333 4.83333C10.3333 6.67428 8.84094 8.16667 6.99999 8.16667C5.15904 8.16667 3.66666 6.67428 3.66666 4.83333C3.66666 2.99238 5.15904 1.5 6.99999 1.5C8.84094 1.5 10.3333 2.99238 10.3333 4.83333Z"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99999 10.6667C3.77833 10.6667 1.16666 13.2783 1.16666 16.5H12.8333C12.8333 13.2783 10.2217 10.6667 6.99999 10.6667Z"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
