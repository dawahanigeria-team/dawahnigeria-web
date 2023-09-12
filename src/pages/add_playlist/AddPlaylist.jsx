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

const Add_playlist = () => {
  const { addplaylist, currentUser, lecid } = useSelector(
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

    //console.log(validateData);

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
        toast.success("lecture added to playlist");
        //toast.success(message);
        setLoading(false);
        setisShow(true);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  // get my playlist
  useEffect(() => {
    if (isShow && currentUser?.id) {
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
          //console.log(res.data);
          setmyFolders(res.data);
          const filter = res.data.map((item) => item.name.toLowerCase());
          setCreated(filter);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }, []);

  //console.log(myFolders);

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

    //console.log(payload)
    // if(payload) return
    axios
      .post(`/playlistApi.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        //console.log(res);
        toast.success(res.data.message);
        dispatch(showaddPlaylist(false));
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <>
      <div
        onClick={(e) => {
          hidePlaylist(e);
        }}
        className={addplaylist ? "addplay_wrapper" : "addplay_wrapper_none"}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            isShow ? "curr_playlist let swipeDown" : "curr_playlist_none"
          }
        >
          <div
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
                    src-data={createplay}
                    src={createplay}
                    alt=" "
                  />
                </div>
              </div>

              <p className="create_text">Create a new playlist</p>
            </div>

            {myFolders?.map(({ name, is_private, id }, index) => {
              return (
                <div
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
                </div>
              );
            })}
          </div>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            isShow ? "smaller_wrapper_none" : "smaller_wrapper let swipeDown"
          }
        >
          <div className="add_play_header">Add a new playlist</div>

          <div
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
          </div>

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
                  <input type="checkbox" defaultChecked={id === seltype} />
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
