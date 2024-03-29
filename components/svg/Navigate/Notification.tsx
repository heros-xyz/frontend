import { Icon, IconProps } from "@chakra-ui/react";

export const NotificationIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 13.1667H14.6666L13.4959 11.9959C13.1784 11.6784 13 11.2477 13 10.7987V8.16667C13 5.98964 11.6086 4.13757 9.66665 3.45118V3.16667C9.66665 2.24619 8.92045 1.5 7.99998 1.5C7.0795 1.5 6.33331 2.24619 6.33331 3.16667V3.45118C4.39133 4.13757 2.99998 5.98964 2.99998 8.16667V10.7987C2.99998 11.2477 2.8216 11.6784 2.50409 11.9959L1.33331 13.1667H5.49998M10.5 13.1667V14C10.5 15.3807 9.38069 16.5 7.99998 16.5C6.61927 16.5 5.49998 15.3807 5.49998 14V13.1667M10.5 13.1667H5.49998"
        stroke="#33EFEF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
