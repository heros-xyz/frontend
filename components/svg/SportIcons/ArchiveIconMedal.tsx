import { Center, Icon, IconProps } from "@chakra-ui/react";

export const ArchiveIconMedal: React.FC<IconProps> = (props) => {
  return (
    <Center
      w={30}
      h={30}
      borderRadius="full"
      border="1px"
      borderColor="currentColor"
    >
      <Icon
        {...props}
        width="13px"
        height="20px"
        viewBox="0 0 13 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.89366 8.70419L12.0003 1.66669M4.76366 8.86002L1.16699 1.66669M7.63449 8.37335L4.36283 1.66669M8.96699 1.66669L8.10033 3.75002M2.00033 13.3334C2.00033 14.6594 2.52711 15.9312 3.46479 16.8689C4.40247 17.8066 5.67424 18.3334 7.00033 18.3334C8.32641 18.3334 9.59818 17.8066 10.5359 16.8689C11.4735 15.9312 12.0003 14.6594 12.0003 13.3334C12.0003 12.0073 11.4735 10.7355 10.5359 9.79782C9.59818 8.86014 8.32641 8.33335 7.00033 8.33335C5.67424 8.33335 4.40247 8.86014 3.46479 9.79782C2.52711 10.7355 2.00033 12.0073 2.00033 13.3334V13.3334Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Icon>
    </Center>
  );
};
