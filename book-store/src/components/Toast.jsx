import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Replace with your close icon

const Toast = ({ type = "success", message = "", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastStyles = {
    base: "fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-4 transition-transform transform",
    success: "bg-green-100 text-green-800 border-l-4 border-green-500",
    error: "bg-red-100 text-red-800 border-l-4 border-red-500",
    hidden: "translate-y-[-150%] opacity-0",
    visible: "translate-y-0 opacity-100",
  };

  return (
    <div
      className={`${toastStyles.base} ${
        type === "success" ? toastStyles.success : toastStyles.error
      } ${visible ? toastStyles.visible : toastStyles.hidden}`}
      role="alert"
    >
      <span className="flex-grow">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        className="text-gray-500 hover:text-gray-700"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;
