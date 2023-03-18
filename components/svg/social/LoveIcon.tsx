import { Icon, IconProps } from "@chakra-ui/react";

export const LoveIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.75736 3.42533C0.414213 5.76847 0.414213 9.56746 2.75736 11.9106L13.0001 22.1533L23.2426 11.9106C25.5858 9.56746 25.5858 5.76847 23.2426 3.42533C20.8995 1.08218 17.1005 1.08218 14.7574 3.42533L13.0001 5.18276L11.2426 3.42533C8.8995 1.08218 5.10051 1.08218 2.75736 3.42533Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
