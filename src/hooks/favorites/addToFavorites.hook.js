import { useMutation } from "@tanstack/react-query";
import { lectureApi } from "../../services";

export const useAddFavoritesHook = () => {
  return useMutation(lectureApi.addToFavorites);
};
