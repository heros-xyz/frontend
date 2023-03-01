import { Icon, IconProps } from "@chakra-ui/react";

export const SoccerIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      width="26px"
      height="26px"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 0.5C6.1 0.5 0.5 6.1 0.5 13C0.5 19.9 6.1 25.5 13 25.5C19.9 25.5 25.5 19.9 25.5 13C25.5 6.1 19.9 0.5 13 0.5ZM14.25 4.625L15.9375 3.4375C18.1987 4.13819 20.1384 5.61737 21.4125 7.6125L20.925 9.2875L19.2375 9.8625L14.25 6.375V4.625ZM10.0625 3.4375L11.75 4.625V6.375L6.7625 9.8625L5.075 9.2875L4.5875 7.6125C5.86899 5.62421 7.80597 4.14715 10.0625 3.4375ZM6.85 19.3875L5.425 19.5125C3.85806 17.705 2.99687 15.3922 3 13C3 12.85 3.0125 12.7125 3.025 12.5625L4.275 11.65L6 12.25L7.825 17.675L6.85 19.3875ZM16.125 22.4875C15.1375 22.8125 14.0875 23 13 23C11.9125 23 10.8625 22.8125 9.875 22.4875L9.0125 20.625L9.8125 19.25H16.2L17 20.6375L16.125 22.4875ZM15.8375 16.75H10.1625L8.475 11.725L13 8.55L17.5375 11.725L15.8375 16.75ZM20.575 19.5125L19.15 19.3875L18.1625 17.675L19.9875 12.25L21.725 11.6625L22.975 12.575C22.9875 12.7125 23 12.85 23 13C23 15.4875 22.0875 17.7625 20.575 19.5125Z"
        fill="currentColor"
      />
    </Icon>
  );
};
