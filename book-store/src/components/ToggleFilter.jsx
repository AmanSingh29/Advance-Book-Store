import React from "react";

const ToggleButton = ({ label, isOn, onToggle }) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-gray-700">{label}</span>
      <div
        onClick={onToggle}
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isOn ? "bg-navy" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleButton;
