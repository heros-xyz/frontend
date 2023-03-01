import { Icon, IconProps } from "@chakra-ui/react";

const ViewList: React.FC<IconProps> = (props) => {
  return (
    <Icon
      width="100%"
      height="100%"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1H17M1 5H17M1 9H17M1 13H17"
        stroke="#313F4C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
export default ViewList;
