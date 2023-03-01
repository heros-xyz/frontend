import type { Meta, StoryObj } from "@storybook/react";
import { ReactNode } from "react";
import Comments from ".";

const meta: Meta<typeof Comments> = {
  title: "Components/Comments",
  component: Comments,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export interface Comment {
  id?: string;
  firstName?: string;
  lastName?: string;
  name: string;
  text: string;
  avatar: string;
  likeCount?: number;
  isLiked: boolean;
  replyComment?: IReplyComment;
  createdAt?: string | Date;
  parentComment?: {
    id?: string;
    content: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface IReplyComment {
  name?: string;
  text?: string;
  avatar?: string;
  likeCount?: number | ReactNode;
  isLiked?: boolean;
}

export default meta;
type Story = StoryObj<typeof Comments>;

export const CommentComponent: Story = {
  args: {
    comments: [
      {
        id: "",
        name: "Kate",
        text: "Champion! 🏆",
        avatar: "https://bit.ly/dan-abramov",
        likeCount: 0,
        isLiked: false,
        replyComment: {
          name: "Paul",
          text: "The god Matt Prior, hope you’ll find success.",
          avatar: "https://bit.ly/ryan-florence",
          likeCount: 0,
          isLiked: false,
        },
      },
      {
        id: "",
        name: "Paul",
        text: "The god Matt Prior, hope you’ll find success.",
        avatar: "https://bit.ly/ryan-florence",
        likeCount: 0,
        isLiked: true,
        replyComment: {
          name: "Paul",
          text: "The god Matt Prior, hope you’ll find success.",
          avatar: "https://bit.ly/ryan-florence",
          likeCount: 0,
          isLiked: false,
        },
      },
      {
        id: "",
        name: "Matt Prior",
        text: "Thank you !",
        avatar: "https://bit.ly/sage-adebayo",
        likeCount: 4,
        isLiked: false,
        replyComment: {
          name: "Paul",
          text: "The god Matt Prior, hope you’ll find success.",
          avatar: "https://bit.ly/ryan-florence",
          likeCount: 0,
          isLiked: false,
        },
      },
      {
        id: "",
        name: "Logan",
        text: "From India with love! 💚🧡🤍",
        avatar: "https://bit.ly/ryan-florence",
        likeCount: 3,
        isLiked: true,
        replyComment: {
          name: "Paul",
          text: "The god Matt Prior, hope you’ll find success.",
          avatar: "https://bit.ly/ryan-florence",
          likeCount: 0,
          isLiked: false,
        },
      },
    ],
  },
};
