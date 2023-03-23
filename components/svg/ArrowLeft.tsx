import { Icon, IconProps } from "@chakra-ui/react";

export const ArrowLeft: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 16L6 16M6 16L15 7M6 16L15 25"
        stroke="#1E16C1"
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
};
