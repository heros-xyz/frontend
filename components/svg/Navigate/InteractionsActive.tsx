import { Icon, IconProps } from "@chakra-ui/react";

export const InteractionsActive: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2V10C16 11.1046 15.1046 12 14 12H9L4 16V12H2C0.895431 12 0 11.1046 0 10V2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2ZM5 5H3V7H5V5ZM7 5H9V7H7V5ZM13 5H11V7H13V5Z"
        fill="#2A2A2A"
      />
    </Icon>
  );
};
