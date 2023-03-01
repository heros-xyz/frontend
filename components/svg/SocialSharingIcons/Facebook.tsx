import { Icon, IconProps } from "@chakra-ui/react";

export const FacebookIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="50" height="50" rx="25" fill="#FFFBEB" />
      <path
        d="M37 25.0733C37 18.4054 31.6274 13 25 13C18.3726 13 13 18.4054 13 25.0733C13 31.0994 17.3882 36.0943 23.125 37V28.5633H20.0781V25.0733H23.125V22.4134C23.125 19.3875 24.9166 17.7161 27.6576 17.7161C28.9701 17.7161 30.3438 17.952 30.3438 17.952V20.9231H28.8306C27.34 20.9231 26.875 21.8539 26.875 22.8096V25.0733H30.2031L29.6711 28.5633H26.875V37C32.6118 36.0943 37 31.0994 37 25.0733Z"
        fill="#313F4C"
      />
    </Icon>
  );
};
