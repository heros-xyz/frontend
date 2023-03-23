import { Icon, IconProps } from "@chakra-ui/react";

export const CommentIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6667 13.332H10.68M16 13.332H16.0133M21.3333 13.332H21.3467M12 21.332H6.66667C5.19391 21.332 4 20.1381 4 18.6654V7.9987C4 6.52594 5.19391 5.33203 6.66667 5.33203H25.3333C26.8061 5.33203 28 6.52594 28 7.9987V18.6654C28 20.1381 26.8061 21.332 25.3333 21.332H18.6667L12 27.9987V21.332Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
