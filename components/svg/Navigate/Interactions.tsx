import { Icon, IconProps } from "@chakra-ui/react";

export const InteractionsIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.66667 6.33325H5.675M9 6.33325H9.00833M12.3333 6.33325H12.3417M6.5 11.3333H3.16667C2.24619 11.3333 1.5 10.5871 1.5 9.66659V2.99992C1.5 2.07944 2.24619 1.33325 3.16667 1.33325H14.8333C15.7538 1.33325 16.5 2.07944 16.5 2.99992V9.66659C16.5 10.5871 15.7538 11.3333 14.8333 11.3333H10.6667L6.5 15.4999V11.3333Z"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
