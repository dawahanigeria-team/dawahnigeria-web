import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import "./search.scss";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";
import { SEARCH } from "../../utils/routes/constants";

const Search = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const searchCtx = useContext(SearchContext) || {};
  const { setText = () => {} } = searchCtx;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (pathname !== SEARCH) {
      setInputValue("");
    }
  }, [pathname]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    setText(inputValue);
    navigate(`/dawahcast/search?query=${encodeURIComponent(inputValue)}`);
  };

  if (!isClient) {
    return (
      <div className="search_wrapper bg-input relative">
        <FiSearch className="search_icon" />
        <input
          type="search"
          className="search_input text-color"
          placeholder="Search"
          disabled
        />
      </div>
    );
  }

  return (
    <div className="search_wrapper bg-input relative">
      <FiSearch className="search_icon" />
      <input
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        value={inputValue}
        type="search"
        className="search_input text-color"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
