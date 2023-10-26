import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { SearchContext } from "../../../App";
import { useContext } from "react";
const LangOptions = () => {
  const { setLanguageId } = useContext(SearchContext);
  const { searchOptions } = useSelector((state) => state.search);
  const [showmore, setshowmore] = useState(false);

  //const dispatch = useDispatch();
  const handleSelected = (e) => {
    //console.log(e.target.value);
    if (e.target.checked) {
      setLanguageId((prev) => [...prev, e.target.value]);
    } else {
      setLanguageId((prev) => prev.filter((item) => item !== e.target.value));
    }
  };

  //console.log(selectCategory);
  return (
    <div className="flex flex-col text-color text-sm font-normal mb-6 w-full space-y-3 h-fit justify-start">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <span>Languages</span>
        </div>
        <div
          onClick={() => {
            setshowmore(!showmore);
          }}
        >
          <MdNavigateNext
            className={`text-color dark:text-[#ddff2b] text-[22px] min-[615px]:text-[25px] ${
              showmore ? "rotate-[-90deg]" : "rotate-[90deg]"
            }`}
          />
        </div>
      </div>
      {showmore && (
        <div className="space-y-5">
          {searchOptions?.lang?.map(({ name, count, id }, idx) => {
            return (
              <label key={idx} className="filter-container flex">
                <div className="flex items-center space-x-2">
                  <div className="text-color ">{name}</div>
                  <span className="bg-[#ddff2b] text-black rounded-full px-2 py-[1px] text-[10px] min-[615px]:text-[13px]">
                    {count}
                  </span>
                </div>
                <input
                  onChange={(e) => handleSelected(e)}
                  type="checkbox"
                  value={id}
                />

                <span className="filter-checkmark"></span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LangOptions;
