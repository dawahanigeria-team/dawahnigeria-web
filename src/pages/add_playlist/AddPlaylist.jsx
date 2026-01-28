import React, { useState, useEffect } from "react";
import "./add_playlist.scss";
import { useSelector, useDispatch } from "react-redux";
import cloase from "../../assets/svg/cloase.svg";
import { showaddPlaylist } from "../../Redux/Actions/ActionCreators";
import createplay from "../../assets/svg/createplay.svg";
import playfolder from "../../assets/svg/folder.svg";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import axios from "../../utils/useAxios";
import Loader from "../../components/UI/loader/loader";
import { MdClose } from "react-icons/md";

const Add_playlist = () => {
  const { addplaylist, currentUser, lecid } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [seltype, setseltype] = useState("");
  const [isShow, setisShow] = useState(true);
  const [created, setCreated] = useState([]);
  const [title, setTitle] = useState("");
  const [myFolders, setmyFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hidePlaylist = (e) => {
    e.stopPropagation();
    dispatch(showaddPlaylist(false));
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
      toast.error("Sign in is required to add playlist");
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
      toast.error("Title already exists");
      return;
    }

    const payload = {
      name: title,
      is_private: seltype,
      user_id: parseInt(currentUser?.id),
      action: "create_playlist",
    };

    setLoading(true);
    setError(null);

    axios
      .post("/playlistApi.php", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        toast.success("Lecture added to playlist");
        setLoading(false);
        setisShow(true);
        // Refresh playlists after adding
        fetchPlaylists();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        toast.error("Failed to create playlist");
      });
  };

  const fetchPlaylists = () => {
    if (!currentUser?.id) return;

    axios
      .get(
        `/playlistApi.php?user_id=${parseInt(
          currentUser?.id
        )}&action=user_playlists`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        }
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          setmyFolders(res.data);
          const filter = res.data.map((item) => item.name.toLowerCase());
          setCreated(filter);
        } else {
          setmyFolders([]);
          setCreated([]);
        }
      })
      .catch((err) => {
        setError(err.message);
        setmyFolders([]);
        setCreated([]);
      });
  };

  useEffect(() => {
    if (isShow && currentUser?.id) {
      fetchPlaylists();
    }
  }, [isShow, currentUser?.id]);

  const addSong = (id) => {
    if (!currentUser?.id) {
      toast.error("Sign in is required to add playlist");
      return;
    }

    const parsedAudioId = parseInt(lecid, 10);
    if (!Number.isFinite(parsedAudioId)) {
      toast.error("Select a lecture before adding to a playlist");
      return;
    }

    const payload = {
      user_id: parseInt(currentUser?.id),
      audio_id: parsedAudioId,
      playlist_id: id,
      action: "add_playlist_audio",
    };

    setLoading(true);
    setError(null);

    axios
      .post("/playlistApi.php", payload, {
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
      .catch((err) => {
        setError(err.message);
        toast.error("Failed to add to playlist");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <div
        onClick={hidePlaylist}
        className={
          addplaylist
            ? "addplay_wrapper dark:bg-black dark:bg-opacity-60 bg-opacity-60 bg-white"
            : "addplay_wrapper_none"
        }
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            isShow
              ? "curr_playlist bg-background shadow-lg text-foreground let swipeDown"
              : "curr_playlist_none"
          }
        >
          <div onClick={hidePlaylist} className="close_image">
            <MdClose className="text-xl" />
          </div>
          <div className="cur_small_wrapper">
            <div className="create_play">
              <div
                onClick={() => {
                  setisShow(false);
                }}
                className="create_icon_wrap"
              >
                <div className="create_folder_icon">
                  <img
                    className="img_sz"
                    src={createplay}
                    alt="Create playlist"
                  />
                </div>
              </div>
              <p className="create_text">Create a new playlist</p>
            </div>

            {Array.isArray(myFolders) &&
              myFolders.map(({ name, is_private, id }, index) => (
                <div
                  onClick={() => addSong(id)}
                  className="created_play"
                  key={index}
                >
                  <div className="created_folder_icon">
                    <img
                      className="img_sz"
                      src={playfolder}
                      alt="Playlist folder"
                    />
                  </div>
                  <p className="created_text">{name}</p>
                </div>
              ))}
          </div>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            isShow
              ? "smaller_wrapper_none"
              : "smaller_wrapper bg-background text-foreground shadow-lg let swipeDown"
          }
        >
          <div className="add_play_header text-foreground">
            Add a new playlist
          </div>

          <div onClick={hidePlaylist} className="close_image">
            <MdClose className="text-xl" />
          </div>

          <input
            type="text"
            name="playlist"
            placeholder="Playlist title"
            required
            value={title}
            onChange={handleChange}
            className="playlist_name"
          />

          <div className="private_public">
            {setType.map(({ type, id }, index) => (
              <label
                onClick={() => setseltype(id)}
                key={index}
                className="container"
              >
                {type}
                <input type="checkbox" defaultChecked={id === seltype} />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>

          <button onClick={submit} className="done_btn" disabled={loading}>
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
