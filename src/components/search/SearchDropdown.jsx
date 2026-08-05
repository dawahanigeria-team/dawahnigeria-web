import React from "react";
import { useNavigate } from "react-router-dom";

const SearchDropdown = ({ results, loading, onSelect }) => {
  const navigate = useNavigate();

  if (!results?.length && !loading) return null;

  return (
    <div className="search_dropdown absolute w-full bg-white dark:bg-zinc-800 mt-2 rounded-md shadow-lg max-h-[400px] overflow-y-auto z-50">
      {loading ? (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin w-6 h-6 rounded-full border-r-2 border-b-2 border-zinc-400 mx-auto"></div>
        </div>
      ) : (
        results.map((item) => (
          <div
            key={item.id}
            className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer border-b border-gray-200 dark:border-zinc-700 flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              console.log("Clicked item:", item);
              onSelect(item);
            }}
          >
            {item.img && (
              <img
                src={item.img}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover" loading="lazy" decoding="async" />
            )}
            <div className="flex-1">
              <div className="font-medium text-color">
                {item.name || item.mp3_title}
              </div>
              {item.cat_name && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.cat_name}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchDropdown;
