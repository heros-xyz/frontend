import { Icon, IconProps } from "@chakra-ui/react";

export const ProfileActive: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.33329 3.83333C9.33329 5.67428 7.84091 7.16667 5.99996 7.16667C4.15901 7.16667 2.66663 5.67428 2.66663 3.83333C2.66663 1.99238 4.15901 0.5 5.99996 0.5C7.84091 0.5 9.33329 1.99238 9.33329 3.83333Z"
        fill="#33EFEF"
      />
      <path
        d="M5.99996 9.66667C2.7783 9.66667 0.166626 12.2783 0.166626 15.5H11.8333C11.8333 12.2783 9.22162 9.66667 5.99996 9.66667Z"
        fill="#33EFEF"
      />
    </Icon>
  );
};
