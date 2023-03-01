import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import Comment from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <Comment
        item={{
          name: "Kate",
          text: "Champion! 🏆",
          avatar: "https://bit.ly/dan-abramov",
          likeCount: 0,
          isLiked: false,
          replyComment: {
            avatar: "",
            isLiked: false,
            likeCount: 10,
            name: "Phong",
            text: "sakjdaskjd",
          },
        }}
      />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
