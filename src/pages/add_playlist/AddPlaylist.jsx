import React, { useState, useEffect } from "react";
import "./add_playlist.scss";
import { useSelector, useDispatch } from "react-redux";
import cloase from "../../assets/svg/cloase.svg";
import { showaddPlaylist } from "../../Redux/Actions/ActionCreators";
import createplay from "../../assets/svg/createplay.svg";
import playfolder from "../../assets/svg/folder.svg";
import { toast } from "react-hot-toast";
import axios from "../../utils/useAxios";
import Loader from "../../components/UI/loader/loader";
import { MdClose } from "react-icons/md";

const Add_playlist = ({lecid}) => {
  const { addplaylist, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [seltype, setseltype] = useState("");
  const [isShow, setisShow] = useState(true);
  const [created, setCreated] = useState();
  const [title, setTitle] = useState("");
  const [myFolders, setmyFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  const hidePlaylist = (e) => {
    e.stopPropagation();
    dispatch(showaddPlaylist(false));
    setisShow(true);
  };

  const setType = [
    { id: 0, type: "Set as public" },
    { id: 1, type: "Set as private" },
  ];

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const submit = () => {
    if (!currentUser?.id) {
      toast.error(`Sign in is required to add playlist`);
      return;
    }
    const validateData = {
      title,
      seltype,
      user_id: currentUser?.id,
    };

    for (let i in validateData) {
      if (validateData[i] === "") {
        toast.error(`${i} is required`);
        return;
      }
    }

    if (created.includes(title.toLowerCase())) {
      toast.error(`Title already exists`);
      return;
    }

    const payload = {
      name: title,
      is_private: seltype,
      user_id: parseInt(currentUser?.id),
      action: "create_playlist",
    };

    setLoading(true);
    axios
      .post(`/playlistApi.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        toast.success(" playlist create successfully");
        // check if the lecid is present before loading the folders
        getPlaylistFolders(currentUser?.id)

        setLoading(false);
       
      })
      .catch((err) => {});
  };

  // get my playlist
  useEffect(() => {
    if (lecid && currentUser?.id) {
  
      getPlaylistFolders(currentUser?.id);
    }
  }, [currentUser?.id]);

  async function getPlaylistFolders(id) {
    axios
      .get(`/playlistApi.php?user_id=${parseInt(id)}&action=user_playlists`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        setmyFolders(res.data);
        const filter = res.data.map((item) => item.name.toLowerCase());
        setCreated(filter);
      })
      .catch((err) => {});
  }

  const addSong = (id) => {
    if (!currentUser?.id) {
      toast.error(`Sign in is required to add playlist`);
      return;
    }
    const payload = {
      user_id: parseInt(currentUser?.id),
      audio_id: parseInt(lecid),
      playlist_id: id,
      action: "add_playlist_audio",
    };

    axios
      .post(`/playlistApi.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(showaddPlaylist(false));
      })
      .catch((err) => {});
  };

  return (
    <>
      <div
        onClick={(e) => {
          hidePlaylist(e);
        }}
        className={
          addplaylist
            ? "addplay_wrapper bg-[rgba(0,0,0,0.05)]   "
            : "addplay_wrapper_none"
        }
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            isShow
              ? "curr_playlist dark:bg-zinc-800 bg-background shadow-lg text-foreground let swipeDown"
              : "curr_playlist_none"
          }
        >
          <button
            onClick={(e) => {
              hidePlaylist(e);
            }}
            className="close_image"
          >
            <MdClose className="text-xl" />
          </button>
          <div className="cur_small_wrapper">
            <div className="create_play">
              <button
                onClick={() => {
                  setisShow(false);
                }}
                className="create_icon_wrap"
              >
                <div className="create_folder_icon">
                  <img
                    className="img_sz"
                    src-data={createplay}
                    src={createplay}
                    alt=" "
                  />
                </div>
              </button>

              <p className="create_text">Create a new playlist</p>
            </div>

            {myFolders?.map(({ name, id }, index) => {
              return (
                <button
                  onClick={() => {
                    addSong(id);
                  }}
                  className="created_play"
                  key={index}
                >
                  {myFolders.length !== 0 && (
                    <div className="created_folder_icon">
                      <img
                        className="img_sz"
                        src={playfolder}
                        src-data={playfolder}
                        alt=" "
                      />
                    </div>
                  )}

                  <p className="created_text">{name}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            isShow
              ? "smaller_wrapper_none"
              : "smaller_wrapper dark:bg-zinc-800 bg-background text-foreground shadow-lg let swipeDown"
          }
        >
          <div className="add_play_header text-foreground">
            Add a new playlist
          </div>

          <button
            onClick={(e) => {
              hidePlaylist(e);
            }}
            className="close_image"
          >
            <img
              className="close_img_sz"
              src={cloase}
              src-data={cloase}
              alt=""
            />
          </button>

          <input
            type="text"
            name="playlist"
            placeholder="Playlist title"
            required
            value={title}
            id="playlist"
            onChange={(e) => {
              handleChange(e);
            }}
            className="playlist_name"
          />

          <div className="private_public">
            {setType.map(({ type, id }, index) => {
              return (
                <label
                  onClick={() => {
                    setseltype(id);
                  }}
                  key={index}
                  className="container"
                >
                  {type}
                  <input
                  onChange={(e) => {
                    setseltype(id)
                  }}
                   type="checkbox" checked={id === seltype} />
                  <span className="checkmark"></span>
                </label>
              );
            })}
          </div>

          <button
            onClick={() => {
              submit();
            }}
            className="done_btn"
          >
            {loading ? (
              <div className="loader_size">
                <Loader />
              </div>
            ) : (
              <span>Done</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_playlist;
