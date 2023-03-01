import { Icon, IconProps } from "@chakra-ui/react";

export const FaceBookIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.5 16C32.5 7.16344 25.3366 0 16.5 0C7.66344 0 0.5 7.16344 0.5 16C0.5 23.9859 6.35094 30.6053 14 31.8056V20.625H9.9375V16H14V12.475C14 8.465 16.3888 6.25 20.0434 6.25C21.7934 6.25 23.625 6.5625 23.625 6.5625V10.5H21.6075C19.62 10.5 19 11.7334 19 13V16H23.4375L22.7281 20.625H19V31.8056C26.6491 30.6053 32.5 23.9859 32.5 16Z"
        fill="currentColor"
      />
    </Icon>
  );
};
