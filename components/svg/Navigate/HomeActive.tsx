import { Icon, IconProps } from "@chakra-ui/react";

export const HomeActive: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711C0.683417 9.09763 1.31658 9.09763 1.70711 8.70711L2 8.41421V15C2 15.5523 2.44772 16 3 16H5C5.55228 16 6 15.5523 6 15V13C6 12.4477 6.44772 12 7 12H9C9.55229 12 10 12.4477 10 13V15C10 15.5523 10.4477 16 11 16H13C13.5523 16 14 15.5523 14 15V8.41421L14.2929 8.70711C14.6834 9.09763 15.3166 9.09763 15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L8.70711 0.292893Z"
        fill="#33EFEF"
      />
    </Icon>
  );
};
