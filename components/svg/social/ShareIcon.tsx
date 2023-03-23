import { Icon, IconProps } from "@chakra-ui/react";

export const ShareIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5785 17.7892C11.8482 17.2509 12 16.6432 12 16C12 15.3568 11.8482 14.7491 11.5785 14.2108M11.5785 17.7892C10.9218 19.1001 9.56598 20 8 20C5.79086 20 4 18.2091 4 16C4 13.7909 5.79086 12 8 12C9.56598 12 10.9218 12.8999 11.5785 14.2108M11.5785 17.7892L20.4215 22.2108M11.5785 14.2108L20.4215 9.78925M20.4215 9.78925C21.0782 11.1001 22.434 12 24 12C26.2091 12 28 10.2091 28 8C28 5.79086 26.2091 4 24 4C21.7909 4 20 5.79086 20 8C20 8.64316 20.1518 9.25086 20.4215 9.78925ZM20.4215 22.2108C20.1518 22.7491 20 23.3568 20 24C20 26.2091 21.7909 28 24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C22.434 20 21.0782 20.8999 20.4215 22.2108Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
