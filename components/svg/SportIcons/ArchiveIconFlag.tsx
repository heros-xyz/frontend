import { Center, Icon, IconProps } from "@chakra-ui/react";

export const ArchiveIconFlag: React.FC<IconProps> = ({
  w = "30px",
  h = "30px",
  ...props
}) => {
  return (
    <Center
      w={w}
      h={h}
      borderRadius="full"
      border="1px"
      borderColor="currentColor"
    >
      <Icon
        {...props}
        width="12px"
        height="14px"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.16699 1.99998H3.50033V0.333313H5.16699V1.99998ZM8.50033 0.333313H6.83366V1.99998H8.50033V0.333313ZM3.50033 8.66665H5.16699V6.99998H3.50033V8.66665ZM11.8337 5.33331V3.66665H10.167V5.33331H11.8337ZM11.8337 8.66665V6.99998H10.167V8.66665H11.8337ZM6.83366 8.66665H8.50033V6.99998H6.83366V8.66665ZM11.8337 0.333313H10.167V1.99998H11.8337V0.333313ZM6.83366 3.66665V1.99998H5.16699V3.66665H6.83366ZM1.83366 5.33331V3.66665H3.50033V1.99998H1.83366V0.333313H0.166992V13.6666H1.83366V6.99998H3.50033V5.33331H1.83366ZM8.50033 6.99998H10.167V5.33331H8.50033V6.99998ZM5.16699 5.33331V6.99998H6.83366V5.33331H5.16699ZM3.50033 3.66665V5.33331H5.16699V3.66665H3.50033ZM6.83366 5.33331H8.50033V3.66665H6.83366V5.33331ZM8.50033 1.99998V3.66665H10.167V1.99998H8.50033Z"
          fill="currentColor"
        />
      </Icon>
    </Center>
  );
};
