import React, { useCallback, useEffect, useState } from "react";

const CheckboxFilter = ({
  options,
  onChange,
  title = "Genre",
  singleSelect = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleSelect = useCallback(
    (value, isChecked) => {
      if (isChecked) {
        if (singleSelect) {
          setSelectedOptions([value]);
        } else {
          setSelectedOptions((prev) => [...prev, value]);
        }
      } else {
        setSelectedOptions((prev) => prev.filter((item) => item !== value));
      }
    },
    [selectedOptions]
  );

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {options?.map((option) => (
          <label key={option?.id} className="flex items-center">
            <input
              checked={selectedOptions?.includes(option?.value)}
              onChange={(e) => handleSelect(option?.value, e.target.checked)}
              type="checkbox"
              className="mr-2"
            />
            {option?.label || option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxFilter;
