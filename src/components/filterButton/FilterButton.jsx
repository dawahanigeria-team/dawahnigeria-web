import React, { useEffect } from "react";
import "./filterButton.scss";
const FilterButton = ({
  setFilter,
  data1,
  setData1,
  data2,
  setData2,
  setActiveId,
  data3,
  setData3,
  title,
  action,
  active,
  setActive,
  data,
  id,
  lid,
  setlectId,
  lecid,
  setLangid,
  setCatid,
  setTypeName,
}) => {
  useEffect(() => {
    setFilter([...data1, ...data2, ...data3]);
  }, [data1, data2, data3]);

  const handleFilter = () => {
    setActive(title);

    setTypeName(action);

    if (action === "name") {
      setlectId(lecid);
      if (title === "All") {
        setData1(
          Array.isArray(data) && data.filter((value) => value.rp || value.name)
        );
      } else {
        let reset = [];
        setData2([...reset]);
        setData3([...reset]);
        setData1(
          Array.isArray(data) &&
            data.filter((value) => (value.rp || value.name).includes(title))
        );
      }
    } else if (action === "language") {
      setLangid(lid);

      setlectId(null);
      setActiveId("All");
      if (title === "All") {
        setData2(
          Array.isArray(data) &&
            data.filter((value) => value.lang || value.lang_id)
        );
      } else {
        setData2(
          Array.isArray(data) && data.filter((value) => value.lang === title)
        );
      }
    } else if (action === "categories") {
      setCatid(id);
      //setIsEmpty(false);
      if (title === "All") {
        setData3(
          Array.isArray(data) &&
            data.filter((value) => value?.cats || value?.categories)
        );
      } else {
        setData3(
          Array.isArray(data) &&
            data.filter(
              (value) =>
                value?.cats?.includes(title) ||
                value?.categories?.includes(title)
            )
        );
      }
    }
  };
  return (
    <div
      onClick={() => {
        handleFilter();
      }}
      className={`filter_wrapper ${active === title ? "filter_active" : ""}`}
    >
      <div className="filter_text">{title}</div>
    </div>
  );
};

export default FilterButton;