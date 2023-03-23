import { Icon, IconProps } from "@chakra-ui/react";

export const Heart: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.59835 5.26632C2.13388 6.73078 2.13388 9.10515 3.59835 10.5696L10 16.9713L16.4017 10.5696C17.8661 9.10515 17.8661 6.73078 16.4016 5.26632C14.9372 3.80185 12.5628 3.80185 11.0983 5.26632L10 6.36471L8.90165 5.26632C7.43718 3.80185 5.06282 3.80185 3.59835 5.26632Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
