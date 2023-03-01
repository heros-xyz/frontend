import { Icon, IconProps } from "@chakra-ui/react";

const RemoveImage: React.FC<IconProps> = (props) => {
  return (
    <Icon
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 8.5L8.5 1.5M1.5 1.5L8.5 8.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
export default RemoveImage;
