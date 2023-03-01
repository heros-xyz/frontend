import { Icon, IconProps } from "@chakra-ui/react";

export const CopyLinkIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="50" height="50" rx="25" fill="#FFFBEB" />
      <path
        d="M27.1332 22.8668C25.3107 21.0444 22.3559 21.0444 20.5335 22.8668L15.8668 27.5335C14.0444 29.3559 14.0444 32.3107 15.8668 34.1332C17.6893 35.9556 20.6441 35.9556 22.4665 34.1332L23.7517 32.848M22.8668 27.1332C24.6893 28.9556 27.6441 28.9556 29.4665 27.1332L34.1332 22.4665C35.9556 20.6441 35.9556 17.6893 34.1332 15.8668C32.3107 14.0444 29.3559 14.0444 27.5335 15.8668L26.2506 17.1497"
        stroke="#313F4C"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
};
