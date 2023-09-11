import React, { useState, useEffect, useContext } from "react";
import "./search.scss";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";

const Search = () => {
  // const [langid, setLangid] = useState()
  //const [rpId, setrpId] = useState()
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { text, setText } = useContext(SearchContext);

  const [inputValue, setInputValue] = useState();
  //console.log(inputValue)
  //const [text, onchange] = useState();
  useEffect(() => {
    if (pathname !== "/search") {
      //setText("")
    }
  }, [pathname]);

  const fetchData = () => {
    if (pathname !== "/search") {
      navigate("/search");
    }
    setText(inputValue);
  };
  return (
    <div className="search_wrapper">
      <FiSearch className="search_icon" />
      <input
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchData();
          }
        }}
        value={inputValue}
        type="search"
        className="search_input"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
