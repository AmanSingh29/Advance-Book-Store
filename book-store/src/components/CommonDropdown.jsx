import React from "react";

const CommonDropdown = ({ options, onSelect, title = "Sort by:" }) => {
  return (
    <div className="flex space-x-4 items-center">
      <p className="text-gray-500">{title}</p>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      >
        {options?.map((option) => (
          <option key={option?.id} value={option?.value}>
            {option?.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommonDropdown;
