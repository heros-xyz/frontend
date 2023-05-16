import { Icon, IconProps } from "@chakra-ui/react";

export const LockIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 13V15M3.5 19H15.5C16.6046 19 17.5 18.1046 17.5 17V11C17.5 9.89543 16.6046 9 15.5 9H3.5C2.39543 9 1.5 9.89543 1.5 11V17C1.5 18.1046 2.39543 19 3.5 19ZM13.5 9V5C13.5 2.79086 11.7091 1 9.5 1C7.29086 1 5.5 2.79086 5.5 5V9H13.5Z"
        stroke="#7949FC"
        stroke-width="2"
        stroke-linecap="round"
      />
    </Icon>
  );
};
