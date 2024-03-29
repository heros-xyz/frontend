import { Icon, IconProps } from "@chakra-ui/react";

const ViewBoard: React.FC<IconProps> = (props) => {
  return (
    <Icon
      width="100%"
      height="100%"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 13V3M7 13C7 14.1046 6.10457 15 5 15H3C1.89543 15 1 14.1046 1 13V3C1 1.89543 1.89543 1 3 1H5C6.10457 1 7 1.89543 7 3M7 13C7 14.1046 7.89543 15 9 15H11C12.1046 15 13 14.1046 13 13M7 3C7 1.89543 7.89543 1 9 1H11C12.1046 1 13 1.89543 13 3M13 13V3M13 13C13 14.1046 13.8954 15 15 15H17C18.1046 15 19 14.1046 19 13V3C19 1.89543 18.1046 1 17 1H15C13.8954 1 13 1.89543 13 3"
        stroke="#313F4C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
export default ViewBoard;
