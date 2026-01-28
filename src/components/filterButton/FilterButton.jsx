import React, { useEffect } from "react";
import "./filterButton.scss";
const FilterButton = ({
  setFilter,
  data1 = [],
  setData1,
  data2 = [],
  setData2,
  setActiveId,
  data3 = [],
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
  setState,
  setCatid,
  setTypeName,
  onSelect,
}) => {
  useEffect(() => {
    if (typeof setFilter === "function") {
      setFilter([...data1, ...data2, ...data3]);
    }
  }, [data1, data2, data3, setFilter]);

  const handleFilter = () => {
    if (typeof onSelect === "function") {
      onSelect({ title, action, id, lid, lecid });
    }
    if (typeof setActive === 'function') setActive(title);
    if (typeof setTypeName === 'function') setTypeName(action);

    if (action === "name") {
      if (typeof setlectId === 'function') setlectId(lecid);
      if (title === "All") {
        if (typeof setData1 === 'function') setData1(
          Array.isArray(data) && data.filter((value) => value.rp || value.name)
        );
      } else {
        let reset = [];
        if (typeof setData2 === 'function') setData2([...reset]);
        if (typeof setData3 === 'function') setData3([...reset]);
        if (typeof setData1 === 'function') setData1(
          Array.isArray(data) &&
            data.filter((value) => (value.rp || value.name).includes(title))
        );
      }
    } else if (action === "language") {
      if (typeof setLangid === 'function') setLangid(lid);

      if (typeof setlectId === 'function') setlectId(null);
      if (typeof setActiveId === 'function') setActiveId("All");
      if (title === "All") {
        if (typeof setData2 === 'function') setData2(
          Array.isArray(data) &&
            data.filter((value) => value.lang || value.lang_id)
        );
      } else {
        if (typeof setData2 === 'function') setData2(
          Array.isArray(data) && data.filter((value) => value.lang === title)
        );
      }
    } else if (action === "state") {
      const isAllState = title === "All" || title === "All states";
      if (typeof setState === "function") setState(isAllState ? "" : title);

      if (typeof setlectId === "function") setlectId(null);
      if (typeof setActiveId === "function") setActiveId("All");
      if (isAllState) {
        if (typeof setData2 === "function")
          setData2(
            Array.isArray(data) && data.filter((value) => value.state)
          );
      } else {
        if (typeof setData2 === "function")
          setData2(
            Array.isArray(data) && data.filter((value) => value.state === title)
          );
      }
    } else if (action === "categories") {
      if (typeof setCatid === 'function') setCatid(id);
      //setIsEmpty(false);
      if (title === "All") {
        if (typeof setData3 === 'function') setData3(
          Array.isArray(data) &&
            data.filter((value) => value?.cats || value?.categories)
        );
      } else {
        if (typeof setData3 === 'function') setData3(
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
