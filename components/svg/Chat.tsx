import { Icon, IconProps } from "@chakra-ui/react";

const Chat: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.4544 8H21.6362C22.8412 8 23.818 8.89543 23.818 10V16C23.818 17.1046 22.8412 18 21.6362 18H19.4544V22L15.0907 18H10.7271C10.1246 18 9.57915 17.7761 9.18432 17.4142M9.18432 17.4142L12.9089 14H17.2725C18.4775 14 19.4544 13.1046 19.4544 12V6C19.4544 4.89543 18.4775 4 17.2725 4H6.36346C5.15847 4 4.18164 4.89543 4.18164 6V12C4.18164 13.1046 5.15847 14 6.36346 14H8.54528V18L9.18432 17.4142Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
export default Chat;
