import { Icon, IconProps } from "@chakra-ui/react";

export const ArrowRight: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 15 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25 7L13.75 7M13.75 7L8.125 1.375M13.75 7L8.125 12.625"
        stroke="#33EFEF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
