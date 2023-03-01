import { Icon, IconProps } from "@chakra-ui/react";

export const Heart: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.51884 3.68584C1.49372 4.71096 1.49372 6.37302 2.51884 7.39815L7.00003 11.8793L11.4812 7.39815C12.5063 6.37302 12.5063 4.71096 11.4812 3.68584C10.456 2.66071 8.79397 2.66071 7.76884 3.68584L7.00003 4.45471L6.23116 3.68584C5.20603 2.66071 3.54397 2.66071 2.51884 3.68584Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
