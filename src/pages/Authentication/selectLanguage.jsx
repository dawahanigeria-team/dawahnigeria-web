import React, { useState, useEffect } from "react";
import "./selectlang.scss";
import axios from "../.././utils/useAxios";
import Loader from "../../components/UI/loader/loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registration } from "../../Redux/Actions/ActionCreators";
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
        //console.log(res.data)
        setLangData(res.data);
      })
      .catch((err) => {
        //console.log(err);
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

    ////console.log(payload)

    dispatch(registration(payload, isSocial, getId, navigate, setLoading));
  };

  return (
    <div className="signuplang_wrapper">
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
                ? "signuplang_name active"
                : "signuplang_name not_active"
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
