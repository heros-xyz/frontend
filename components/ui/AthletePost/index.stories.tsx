import type { Meta, StoryObj } from "@storybook/react";
import { Box, Flex, Text, Avatar, Icon } from "@chakra-ui/react";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { DeleteIcon } from "@/components/svg/menu/DeleteIcon";
import AthletePost from ".";

const meta: Meta<typeof AthletePost> = {
  title: "Components/AthletePost",
  component: AthletePost,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AthletePost>;

export const AthletePostComponent: Story = {
  args: {
    slideData: [
      {
        id: "7c8e11fd-2184-4000-bf31-d32b50b3092d",
        createdAt: "2023-03-03T12:36:56.521Z",
        updatedAt: "2023-03-03T12:36:56.521Z",
        deletedAt: null,
        extension: "mp4",
        type: "video",
        sortOrder: 0,
        url: "medias/1593caa0-b9c0-11ed-8a0f-e79cb144843f.mp4",
      },
    ],
    menuList: [
      { id: "edit", itemName: "Edit", Icon: <EditIcon /> },
      { id: "delete", itemName: "Delete", Icon: <DeleteIcon /> },
    ],
    athleteInfo: {
      imagePath: "/images/heros.png",
      athleteName: "Matt Prior",
      publishDate: "26/10/22",
      id: "32323",
    },
    postLikes: 123,
    postComments: 2,
    postContent:
      "Never give up, never give in, and when the upper hand is ours, may we have the ability to handle the win with the dignity that we absorbed the loss.",
  },
};

export const AthletePostWithComment: Story = {
  args: {
    slideData: [
      {
        id: "7c8e11fd-2184-4000-bf31-d32b50b3092d",
        createdAt: "2023-03-03T12:36:56.521Z",
        updatedAt: "2023-03-03T12:36:56.521Z",
        deletedAt: null,
        extension: "mp4",
        type: "video",
        sortOrder: 0,
        url: "medias/1593caa0-b9c0-11ed-8a0f-e79cb144843f.mp4",
      },
    ],
    menuList: [
      { id: "edit", itemName: "Edit", Icon: <EditIcon /> },
      { id: "delete", itemName: "Delete", Icon: <DeleteIcon /> },
    ],
    athleteInfo: {
      imagePath: "/images/heros.png",
      athleteName: "Matt Prior",
      publishDate: "26/10/22",
      id: "ddasdsdsd",
    },
    postLikes: 123,
    postComments: 2,
    postContent:
      "Never give up, never give in, and when the upper hand is ours, may we have the ability to handle the win with the dignity that we absorbed the loss.",
  },
  render: (args) => (
    <AthletePost {...args}>
      <Box mt={5}>
        <Flex alignItems="center" fontSize="xs" color="white">
          <Flex alignItems="center">
            <Avatar w={5} h={5} name="Dan Abrahmov" src="/images/heros.png" />
            <Text ml={3} fontFamily="heading">
              Matt Prior
            </Text>
          </Flex>
          <Text ml={3}>Thank you !</Text>
        </Flex>
        <Flex mt={2.5} alignItems="center" fontSize="xs" color="white">
          <Flex alignItems="center">
            <Avatar w={5} h={5} name="Dan Abrahmov" src="/images/heros.png" />
            <Text ml={3} fontFamily="heading">
              Matt Prior
            </Text>
          </Flex>
          <Text ml={3}>Thank you !</Text>
        </Flex>
        <Text
          cursor="pointer"
          color="secondary"
          textDecoration="underline"
          mt={4}
          fontSize="xs"
        >
          View all comments
        </Text>
      </Box>
    </AthletePost>
  ),
};

export const AthletePostWithFanVote: Story = {
  args: {
    menuList: [
      { id: "edit", itemName: "Edit", Icon: <EditIcon /> },
      { id: "delete", itemName: "Delete", Icon: <DeleteIcon /> },
    ],
    socialOrder: true,
    athleteInfo: {
      imagePath: "/images/heros.png",
      athleteName: "Matt Prior",
      publishDate: "26/10/22",
      id: "id",
    },
    postLikes: 123,
    postComments: 2,
    postContent:
      "Never give up, never give in, and when the upper hand is ours, may we have the ability to handle the win with the dignity that we absorbed the loss.",
  },
  render: (args) => (
    <AthletePost {...args}>
      <Box mt={4}>
        <Flex alignItems="center" fontSize="xs" color="white">
          <Flex alignItems="center">
            <Icon viewBox="0 0 200 200" color="red.500" boxSize={8}>
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
            <Text ml={3} fontFamily="heading">
              Fan no. 1
            </Text>
          </Flex>
          <Text ml={3}>Totally agreed!</Text>
        </Flex>
      </Box>
    </AthletePost>
  ),
};
