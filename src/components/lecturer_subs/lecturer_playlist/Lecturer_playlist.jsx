import React, { useEffect, useState} from "react";
import AlbumWidget from "../../../components/albumWidget/AlbumWidget";
import axios from "../../../utils/useAxios";
import "./lecturerplaylist.scss";

import { Link } from "react-router-dom";
import Loader from "../../UI/loader/loader";
import CommentBox from "../../comment/comment";
import { useSelector } from "react-redux";
import { PLAYLISTS } from "../../../utils/routes/constants";
const Lecturer_playlist = ({ id, setCount3}) => {
  const [data, setData] = useState([]);
  const {currentUser} = useSelector((state) => state.user)
  const [audioComment, setaudioComment] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCount3(data.length);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const handleRequest = () => {
      ///https://dawahbox.com/mongo/api/playlistApi.php?action=all_public_playlist_data&rp_id=39429
      axios
        .get(`/playlistApi.php?action=all_public_playlist_data&rp_id=${id}`)
        .then((res) => {
          //console.log(res.data);
          setData(res.data);
          setLoading(false);
          setCount3(data.length);
        })
        .catch((err) => {
          //console.log(err);
        });
    };

    handleRequest();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    //////*************handling comment**************** */

    useEffect(() => {
      if (!currentUser?.id) return;
  
      axios
        .get(
          `/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=rp`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
            },
          }
        )
        .then((res) => {
          //console.log("comment result", res);
          setaudioComment(res.data.reverse());
        })
        .catch((err) => {
          //console.log(err);
        });
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  

  return (
    <>
      {loading && (
        <div className="load_desktop">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="text-gray-200 no_playlist flex items-center justify-center w-full h-[200px]">
          <span>-- no playlist --</span>
        </div>
      )}
      <div className="lecplaylist_wrapper">
        {!loading &&
          data.length !== 0 &&
          data.map(({ name, id, views, lec_img }, idx) => {
            return (
              <Link to={`${PLAYLISTS}${id}`}
                className="lecplaylist_item "
                onClick={() => {
                  
                }}
                key={idx + 1}
              >
                <AlbumWidget
                  key={idx}
                  categories={name}
                  views={views || 0}
                  img={lec_img}
                />
              </Link>
            );
          })}
      </div>

      <div className="lecplaylist_comments">
        <CommentBox
        audioComment={audioComment} id={id} type={'rp'}
        />
      </div>
    </>
  );
};

export default Lecturer_playlist;
