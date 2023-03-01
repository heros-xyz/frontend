import { Icon, IconProps } from "@chakra-ui/react";

export const UserIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3337 5.83333C13.3337 7.67428 11.8413 9.16667 10.0003 9.16667C8.15938 9.16667 6.66699 7.67428 6.66699 5.83333C6.66699 3.99238 8.15938 2.5 10.0003 2.5C11.8413 2.5 13.3337 3.99238 13.3337 5.83333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0003 11.6667C6.77866 11.6667 4.16699 14.2783 4.16699 17.5H15.8337C15.8337 14.2783 13.222 11.6667 10.0003 11.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
