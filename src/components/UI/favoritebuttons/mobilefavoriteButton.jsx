import React, { useMemo, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { formatNumber } from "../formatter";
import { useAddFavoritesHook, useFetchFavoritesHook } from "../../../hooks";
import { useSelector } from "react-redux";
import toast, { LoaderIcon } from "react-hot-toast";
export function MobileFavoriteButton({ favorites, id, type, refetch }) {
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

        refetch(); // refetch favorite count
        refetchFavorite(); //refetch all favorites
        setdisabled(false);
        setLoading(false);
      },
      onError: (error) => {},
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
      className="icons_mob_listblack"
    >
      <button className="likeys_img">
        {favoriteCount[type]?.includes(parseInt(id)) ? (
          <AiFillHeart className="text-foreground text-xl dark:text-[#ddff2b]" />
        ) : (
          <AiFillHeart className=" text-xl text-[#aeaeae]" />
        )}
      </button>

      {isLoading ? (
        <LoaderIcon className="text-sm animate-spin" />
      ) : (
        <span className="likeys_text">{formatFavorite}</span>
      )}
    </button>
  );
}
