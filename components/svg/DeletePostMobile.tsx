import { Icon, IconProps } from "@chakra-ui/react";

export const DeletePostMobileIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      width="50"
      height="50"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#FEE2E2" />
      <path
        d="M23.9995 21V23M23.9995 27H24.0095M17.0713 31H30.9277C32.4673 31 33.4296 29.3333 32.6598 28L25.7316 16C24.9618 14.6667 23.0373 14.6667 22.2675 16L15.3393 28C14.5695 29.3333 15.5317 31 17.0713 31Z"
        stroke="#FF6767"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
