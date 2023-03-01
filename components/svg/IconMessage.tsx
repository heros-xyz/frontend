import { Icon, IconProps } from "@chakra-ui/react";

export const IconMessage: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.4544 5H18.6362C19.8412 5 20.818 5.89543 20.818 7V13C20.818 14.1046 19.8412 15 18.6362 15H16.4544V19L12.0907 15H7.72709C7.1246 15 6.57915 14.7761 6.18432 14.4142M6.18432 14.4142L9.90891 11H14.2725C15.4775 11 16.4544 10.1046 16.4544 9V3C16.4544 1.89543 15.4775 1 14.2725 1H3.36346C2.15847 1 1.18164 1.89543 1.18164 3V9C1.18164 10.1046 2.15847 11 3.36346 11H5.54528V15L6.18432 14.4142Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
