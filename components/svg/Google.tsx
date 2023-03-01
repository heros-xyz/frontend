import { Icon, IconProps } from "@chakra-ui/react";

export const GoogleIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.232 7.32731C15.1486 6.31445 13.7028 5.76268 12.2068 5.78535C9.46935 5.78535 7.14445 7.59562 6.31549 10.0333C5.87596 11.3107 5.87596 12.6939 6.31549 13.9713H6.31934C7.15214 16.4052 9.4732 18.2155 12.2107 18.2155C13.6237 18.2155 14.8369 17.8612 15.7771 17.2354V17.2329C16.8836 16.5148 17.6393 15.3848 17.8745 14.1074H12.2068V10.1467H22.1041C22.2275 10.8345 22.2853 11.5375 22.2853 12.2367C22.2853 15.365 21.1447 18.0099 19.1602 19.8012L19.1623 19.8028C17.4234 21.375 15.0368 22.2858 12.2068 22.2858C8.23941 22.2858 4.61132 20.0938 2.83004 16.6206C1.3418 13.7143 1.34181 10.2903 2.83006 7.38402C4.61133 3.90707 8.23941 1.71505 12.2068 1.71505C14.8132 1.68481 17.3309 2.64476 19.2278 4.39079L16.232 7.32731Z"
        fill="currentColor"
      />
    </Icon>
  );
};
