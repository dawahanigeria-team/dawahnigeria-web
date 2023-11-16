import React, { useMemo, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { formatNumber } from "../formatter";
import { useAddFavoritesHook, useFetchFavoritesHook } from "../../../hooks";
import { useSelector } from "react-redux";
import toast, { LoaderIcon } from "react-hot-toast";
import { AddFavourites } from "../../svgcomponent/svgComponent";
export function DesktopFavoriteButton({ favorites, id, type, refetch }) {
  const [isdisabled, setdisabled] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(false);
  const formatFavorite = useMemo(
    () => formatNumber(favorites || 0),
    [favorites]
  );

  const keyParam = { id: currentUser?.id, type };
  const { favoriteCount, refetch: refetchFavorite } =
    useFetchFavoritesHook(keyParam);

  /////get users favorites

  const { mutate: addToFavorite } = useAddFavoritesHook();

  const addToFav = async (e) => {
    e.stopPropagation();
    if (!currentUser?.id) {
      toast.error("Login or register to add to favorites");
      return;
    }
    setLoading(true);
    const payload = {
      user_id: currentUser?.id,
      item_id: parseInt(id),
      type,
    };
    addToFavorite(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        refetch(); //refetch favorite count
        refetchFavorite(); // refetch all favorite
        setdisabled(false);
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
      },
    });
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToFav(e);
        setdisabled(true);
      }}
      disabled={isdisabled}
      className="leclistdet_fav bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]"
    >
      <span className="fav_btn">
        {favoriteCount[type]?.includes(parseInt(id)) ? (
          <MdFavorite className="leclistdet_fav_icon_active dark:text-[#ddff2b] text-foreground" />
        ) : (
          <AddFavourites />
        )}
      </span>

      {isLoading ? (
        <LoaderIcon className="text-sm animate-spin" />
      ) : (
        <p className="leclistdet_fav_text text-color-primary">
          {formatFavorite}
        </p>
      )}
    </button>
  );
}
