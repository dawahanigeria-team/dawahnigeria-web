import React, { useEffect, useState, useCallback, useRef } from "react";
import "./simillarrp.scss";
//import SimrpWidget from "../../simrpWidget/SimrpWidget";
import axios from "../../../utils/useAxios"
import infiniteScroll from "../../UI/infiniteScroll";
import LecturersWidget from "../../lecturersWidget/LecturersWidget";
import { Link, useNavigate } from "react-router-dom";
import { RESOURCE_PERSON } from "../../../utils/routes/constants";
import Loader from "../../UI/loader/loader";
import _ from 'lodash'
import GenreMobileLecturer from "../../../pages/genredetail/genreMobileLecturer";
const Simillarrp = ({langid}) => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const observer = useRef();
  const issimilarrp  = true
  
  useEffect(() => {
    if (page > 1) {
      setNextPageLoad(true);
    }
    axios
      .get(
        `https://www.dawahbox.com/mongo/api/all_rps_api.php?offset=30&lim=10&page=${page}&langid=${langid}`
      )
      .then((res) => {
        console.log(res.data);
        if (page === 1) {
          setLoading(false);
        }
        setNextPageLoad(false);
        if (res.data.length === 0) {
          setIsEmpty(true);
          return;
        }
        setData((prev) => _.uniqBy([...prev, ...res.data], 'id'));
      })
      .catch((err) => {
        console.log(err);
      });
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, langid]);

  const lastElement = useCallback(
    (node) => {
    

      if (isEmpty) {
       
        return;
      }
      infiniteScroll(node, observer, page, setPage);      
    },
 // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  return (
    <div>
          {loading && (
        <div className="load_desktop">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}
    <div className="simrp_wrapper">
      {!loading && data.map(({ img, name, views, id }, idx) => {
      if(data.length === idx + 1) {
        return (
          <Link to={`${RESOURCE_PERSON}${id}`}
       
          
          className="lecturers_item"
          ref={lastElement}
        >
          <LecturersWidget
            
            views={views}   
            img={ img || "https://imagetolink.com/ib/a3qzKSu0SB.jpeg"}
            rp={name}
          />
          <GenreMobileLecturer
          views={views}
          styling={issimilarrp}
          rp={name}
          img={
            img || "https://imagetolink.com/ib/a3qzKSu0SB.jpeg"
          }
        />
        </Link>
        );
      } else {
        return (
          <Link to={`${RESOURCE_PERSON}${id}`}
          key={idx}
          onClick={() => {
            navigate(`${RESOURCE_PERSON}${id}`);
          }}
          className="lecturers_item"
         
        >
          <LecturersWidget
         
            views={views}   
            img={ img || "https://imagetolink.com/ib/a3qzKSu0SB.jpeg"}
            rp={name}
          />
          <GenreMobileLecturer
          views={views}
          styling={issimilarrp}
          rp={name}
          img={
            img || "https://imagetolink.com/ib/a3qzKSu0SB.jpeg"
          }
        />
        </Link>
        );
      }
        
      })}
    </div>
    {nextPageLoad && (
        <div className="load_m">
          <div className="loads">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

export default Simillarrp;
