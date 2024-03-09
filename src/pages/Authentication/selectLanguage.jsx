import React, { useState, useEffect } from "react";
import "./selectlang.scss";
import axios from "../.././utils/useAxios";
import Loader from "../../components/UI/loader/loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registration } from "../../Redux/Actions/ActionCreators";
import HeadMeta from "../../components/head-meta";
const SelectLanguage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [langData, setLangData] = useState([]);
  const [langid, setlangid] = useState();

  const [selected, setselected] = useState(false);

  useEffect(() => {
    axios
      .get(`/all_lang_api.php`)
      .then((res) => {
   
        setLangData(res.data);
      })
      .catch((err) => {
     
      });
  }, []);

  //social authentication method
  const handleSocialRegister = () => {
    const isSocial = true;
    const getId = null;
    const payload = {
      ...state?.payload,
      languageId: langid,
    };

   

    dispatch(registration(payload, isSocial, getId, navigate, setLoading));
  };

  return (
    <div className="signuplang_wrapper">
      <HeadMeta title="Select language |  Dawah Nigeria, home of Islamic resources" />
      <p className="header">Select a language</p>

      {langData?.map(({ name, id }, index) => {
        return (
          <div
            onClick={() => {
              setlangid(id);
              setselected(true);
            }}
            key={index}
            className={
              selected && id === langid
                ? "signuplang_name active dark:bg-white bg-[#ddff2b]"
                : "signuplang_name  text-foreground"
            }
          >
            {name}
          </div>
        );
      })}

      <button
        disabled={!selected}
        onClick={handleSocialRegister}
        className="continue_btn"
      >
        {!loading ? <span>Continue</span> : <Loader className="loader_size" />}{" "}
      </button>
    </div>
  );
};

export default SelectLanguage;
