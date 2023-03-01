import { Icon, IconProps } from "@chakra-ui/react";

export const FlagIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      width="18px"
      height="20px"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 2.5H5.25V0H7.75V2.5ZM12.75 0H10.25V2.5H12.75V0ZM5.25 12.5H7.75V10H5.25V12.5ZM17.75 7.5V5H15.25V7.5H17.75ZM17.75 12.5V10H15.25V12.5H17.75ZM10.25 12.5H12.75V10H10.25V12.5ZM17.75 0H15.25V2.5H17.75V0ZM10.25 5V2.5H7.75V5H10.25ZM2.75 7.5V5H5.25V2.5H2.75V0H0.25V20H2.75V10H5.25V7.5H2.75ZM12.75 10H15.25V7.5H12.75V10ZM7.75 7.5V10H10.25V7.5H7.75ZM5.25 5V7.5H7.75V5H5.25ZM10.25 7.5H12.75V5H10.25V7.5ZM12.75 2.5V5H15.25V2.5H12.75Z"
        fill="currentColor"
      />
    </Icon>
  );
};
