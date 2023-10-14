import React, { useMemo, useState } from "react";
import adfav from "../../../assets/svg/adfav.svg";
import lovebold from "../../../assets/svg/lovebold.svg";
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
  const { favoriteCount } = useFetchFavoritesHook(keyParam);

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
        //  console.log("response", data);
        toast.success(data.message);
        refetch();
        setdisabled(false);
        setLoading(false);
      },
      onError: (error) => {
        console.log("error", error);
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
      className="icons_mob_listblack"
    >
      <button className="likeys_img">
        {favoriteCount.album?.includes(parseInt(id)) ? (
          <img className="likeys_img_sz" src={adfav} alt="" />
        ) : (
          <img className="likeys_img_sz" src={lovebold} alt="" />
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
