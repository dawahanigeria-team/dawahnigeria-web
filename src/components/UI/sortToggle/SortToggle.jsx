import { SORT_NEWEST, SORT_OLDEST } from "../../../hooks/common/useSortParam.hook";

/**
 * Newest / Oldest sort control for lecture listings.
 * Controlled: pass the current `sort` ("asc" | "desc") and an `onChange` handler.
 * Changing the value should reset the list to page 1 (the listing hooks do this
 * automatically because `sort` is part of their query key).
 */
const SortToggle = ({ sort, onChange, className = "" }) => {
  const options = [
    { value: SORT_NEWEST, label: "Newest" },
    { value: SORT_OLDEST, label: "Oldest" },
  ];

  return (
    <div
      className={`inline-flex items-center rounded-full bg-input p-0.5 text-sm ${className}`}
      role="group"
      aria-label="Sort lectures by date"
    >
      {options.map(({ value, label }) => {
        const active = sort === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => !active && onChange(value)}
            className={`px-3 py-1.5 rounded-full transition-colors duration-200 ${
              active
                ? "bg-dncolor-500 text-[#030303] font-medium"
                : "text-color hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default SortToggle;
