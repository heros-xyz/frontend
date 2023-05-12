import { useDispatch } from "react-redux";
import { finishLoading, startLoading } from "@/store/globalSlice";

export const useLoading = () => {
  const dispatch = useDispatch();

  const start = () => {
    dispatch(startLoading());
  };

  const finish = () => {
    dispatch(finishLoading());
  };

  return {
    start,
    finish,
    finishLoading,
    startLoading
  };
};
