import { Icon, IconProps } from "@chakra-ui/react";

export const DeleteIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.833 4.83333L13.1102 14.9521C13.0479 15.8243 12.3222 16.5 11.4478 16.5H4.55154C3.67714 16.5 2.95141 15.8243 2.88911 14.9521L2.16634 4.83333M6.33301 8.16667V13.1667M9.66634 8.16667V13.1667M10.4997 4.83333V2.33333C10.4997 1.8731 10.1266 1.5 9.66634 1.5H6.33301C5.87277 1.5 5.49967 1.8731 5.49967 2.33333V4.83333M1.33301 4.83333H14.6663"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
