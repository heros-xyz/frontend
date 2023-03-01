import { useEffect, useState } from "react";

export const useScrollToBottom = () => {
  const [isBottom, setIsBottom] = useState(false);
  const onScroll = () => {
    // const pageHeight = document.body?.clientHeight ?? 0;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { isBottom };
};
