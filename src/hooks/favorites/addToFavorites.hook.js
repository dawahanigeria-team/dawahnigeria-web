import { useMutation } from "@tanstack/react-query";
import { favoriteApi } from "../../services";

export const useAddFavoritesHook = () => {
  return useMutation(favoriteApi.addToFavorites);
};
