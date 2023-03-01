import { Icon, IconProps } from "@chakra-ui/react";

export const DeletePostIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      width="81"
      height="81"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#FEE2E2" />
      <path
        d="M40.0005 35V38.3333M40.0005 45H40.0172M28.4535 51.6667H51.5475C54.1135 51.6667 55.7173 48.8889 54.4343 46.6667L42.8873 26.6667C41.6043 24.4444 38.3968 24.4444 37.1138 26.6667L25.5668 46.6667C24.2838 48.8889 25.8875 51.6667 28.4535 51.6667Z"
        stroke="#FF6767"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
