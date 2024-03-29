import { Center, Icon, IconProps } from "@chakra-ui/react";

export const ArchiveIconMedal: React.FC<IconProps> = (props) => {
  return (
    <Center
      w={{ base: "30px", xl: "60px" }}
      h={{ base: "30px", xl: "60px" }}
      borderRadius="full"
      border="1px"
      borderColor="currentColor"
    >
      <Icon
        {...props}
        width={{ base: "13px", xl: "22px" }}
        height={{ base: "20px", xl: "36px" }}
        viewBox="0 0 16 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.8516 0.863281C12.5586 2.00645 12.2715 3.13027 11.9785 4.24063C9.32422 4.6666 6.67578 4.66719 4.02148 4.24063C3.72852 3.13027 3.44141 2.00645 3.14844 0.863281C6.36523 2.18633 9.63476 2.18633 12.8516 0.863281V0.863281ZM13.8652 1.13223L15.8809 3.82461C15.0605 9.46426 13.5371 15.7865 11.3398 21.5756C10.7129 20.849 9.86328 20.3275 8.89063 20.1283C10.5488 13.6068 12.207 7.68887 13.8652 1.13223V1.13223ZM2.13477 1.13223C3.79297 7.68887 5.45117 13.6068 7.10938 20.1283C6.13672 20.3275 5.28711 20.849 4.66016 21.5756C2.46289 15.7865 0.939453 9.46426 0.119141 3.82461L2.13477 1.13223ZM8 21.0893C9.85156 21.0893 11.3398 22.5775 11.3398 24.4291C11.3398 26.2807 9.85156 27.7689 8 27.7689C6.14844 27.7689 4.66016 26.2807 4.66016 24.4291C4.66016 22.5775 6.14844 21.0893 8 21.0893Z"
          fill="currentColor"
        />
      </Icon>
    </Center>
  );
};
