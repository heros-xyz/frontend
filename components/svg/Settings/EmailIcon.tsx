import { Icon, IconProps } from "@chakra-ui/react";

export const EmailIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 15.8333V8.39198C2.5 7.83473 2.7785 7.31434 3.24217 7.00523L9.0755 3.11634C9.63533 2.74312 10.3647 2.74312 10.9245 3.11634L16.7578 7.00523C17.2215 7.31434 17.5 7.83473 17.5 8.39198V15.8333M2.5 15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333M2.5 15.8333L8.125 12.0833M17.5 15.8333L11.875 12.0833M2.5 8.33334L8.125 12.0833M17.5 8.33334L11.875 12.0833M11.875 12.0833L10.9245 12.717C10.3647 13.0902 9.63533 13.0902 9.0755 12.717L8.125 12.0833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
