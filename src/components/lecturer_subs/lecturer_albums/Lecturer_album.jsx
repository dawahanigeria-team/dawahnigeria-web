import React, { useEffect, useState } from "react";
import AlbumWidget from "../../../components/albumWidget/AlbumWidget";
import axios from "../../../utils/useAxios";
import "./lecturer_album.scss";
import lazyalbum from "../../../assets/png/album.jpeg"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../UI/loader/loader";
import _ from "lodash";
import CommentBox from "../../comment/comment";
import { ALBUMS } from "../../../utils/routes/constants";

const Lecturer_album = ({ id, setCount2, rpname, setImg }) => {
  const [data, setData] = useState([]);

  const [rpid, setRpid] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [audioComment, setaudioComment] = useState();

  useEffect(() => {
    setCount2(data.length);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    axios
      .get("https://backend.dawahnigeria.com/dboxapi/rpjson")
      .then((res) => {
        setRpid(
          res.data.rp.filter((value) => {
            return value.name === rpname;
          })[0]?.id
        );
        setImg(
          res.data.rp.filter((value) => {
            return value.name === rpname;
          })[0]?.img
        );
      })
      .catch((err) => {
        //console.log(err);
      });
  });

  useEffect(() => {
    const handleRequest = () => {
      if (page > 1) {
        setNextPageLoad(true);
      }

      axios
        .get(
          `/albumlisting_rp.php?offset=30&lim=10&page=${page}&rpid=${
            id || rpid
          }`
        )
        .then((res) => {
          //console.log(res.data);

          if (page === 1) {
            setLoading(false);
          }
          setNextPageLoad(false);
          if (res.data.length === 0 || undefined) {
            setIsEmpty(true);
            return;
          }

          setData((prev) => _.uniqBy([...prev, ...res.data], "id"));
        })
        .catch((err) => {
          //console.log(err);
        });
    };

    handleRequest();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpid, page]);
  // //console.log(setCount2);

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


  //console.log(data);


  return (
    <>
      {loading && (
        <div className="load_desktop">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}
      <div className="lecalb_wrapper">
        {!loading &&
          data.map(
            (
              {
                categories,
                img,
                name,
                rpname,
                cats,
                share,
                nid,
                id,
                audio,
                Title,
                title,
                views,
                favorites,
                comments,
              },
              idx
            ) => {
             
                return (
                  <Link to={`${ALBUMS}${id}`}
                    className="lecalb_album_item"
                    
                    key={idx + 1}
                  >
                    <AlbumWidget
                      key={idx}
                      views={views}
                      categories={name.split("-")[0]}
                      img={img ||lazyalbum} 
                    />
                  </Link>
                );
              
            }
          )}
      </div>
      {!loading && <div className="flex w-full min-[615px]:mt-6 mt-3 items-center h-fit justify-center  min-[615px]:text-[16px] text-sm">    <button
                onClick={() => {
                  if (isEmpty) return;
                  setPage(page + 1);
                }}
                className={!isEmpty ?"w-[40%] min-[615px]:w-[200px] min-[615px]:py-3   flex justify-center items-center py-2 border border-gray-400 text-gray-400 rounded-2xl": 'hidden'}
              >
                {nextPageLoad ? (
                  <span className="rounded-full w-4 h-4 border-l border-r border-gray-400 animate-spin"></span>
                ) : (
                  <span>Show more</span>
                )}
              </button></div>}
 
      <div className="lecalb_comments">
        <CommentBox audioComment={audioComment} id={id} type={'rp'}/>
      </div>
    </>
  );
};

export default Lecturer_album;
