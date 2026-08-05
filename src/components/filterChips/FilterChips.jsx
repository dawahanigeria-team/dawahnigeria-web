import React from "react";
import "./filterChips.scss";

/**
 * Horizontally scrollable row of single-select filter chips.
 *
 * Built as a radiogroup rather than a list of links: picking an option re-cuts
 * the feed in place, it does not navigate. Real <button>s are used so the row
 * is keyboard reachable and announces its selected state, which a styled
 * <div onClick> would not.
 *
 * `options` is [{ id, name }]. An id of null is valid and means "no filter".
 */
const FilterChips = ({ options, value, onChange, label, className = "" }) => {
  if (!Array.isArray(options) || options.length === 0) return null;

  return (
    <div
      className={`filter_chips ${className}`}
      role="radiogroup"
      aria-label={label}
    >
      <div className="filter_chips_scroll">
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={String(option.id)}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`filter_chip ${selected ? "is_selected" : ""}`}
              onClick={() => onChange(option.id)}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterChips;
