import { Icon, IconProps } from "@chakra-ui/react";

export const NotificationActive: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.00003 0C3.68632 0 1.00003 2.68629 1.00003 6V9.58579L0.292922 10.2929C0.00692448 10.5789 -0.0786313 11.009 0.0761497 11.3827C0.230931 11.7564 0.595567 12 1.00003 12H13C13.4045 12 13.7691 11.7564 13.9239 11.3827C14.0787 11.009 13.9931 10.5789 13.7071 10.2929L13 9.58579V6C13 2.68629 10.3137 0 7.00003 0Z"
        fill="#33EFEF"
      />
      <path
        d="M7 16C5.34315 16 4 14.6569 4 13H10C10 14.6569 8.65685 16 7 16Z"
        fill="#33EFEF"
      />
    </Icon>
  );
};
