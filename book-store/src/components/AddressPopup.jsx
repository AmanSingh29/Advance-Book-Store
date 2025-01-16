import React, { useState, useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AddressPopup = ({ addresses = [], onClose, onSave }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  const handleAddAddress = useCallback(() => {
    const address = selectedAddress || newAddress?.trim();
    onSave(address);
    setNewAddress("");
  }, [newAddress, addresses, selectedAddress]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-slide-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <XMarkIcon className="h-5 w-5 text-gray-700" />
        </button>

        {/* Popup Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Address</h2>

        {/* Address List */}
        <div className="mb-4 max-h-40 overflow-y-auto">
          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <div
                key={index}
                className={`p-2 border rounded-md mb-2 cursor-pointer ${
                  selectedAddress === address
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-50 border-gray-200"
                }`}
                onClick={() =>
                  setSelectedAddress((prev) =>
                    prev === address ? "" : address
                  )
                }
              >
                {address}
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No addresses available. Add one below.
            </p>
          )}
        </div>

        {/* Add New Address */}
        <textarea
          value={newAddress}
          disabled={selectedAddress ? true : false}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Add a new address"
          className="w-full border rounded-md p-2 text-sm mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddAddress}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Continue To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPopup;
