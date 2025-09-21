"use client";

import { Button } from "@heroui/react";
import { useState } from "react";

export default function TermsAndConditions({ onClose, accepted, setAccepted }: { onClose: () => void, accepted?:boolean, setAccepted?:(accepted:boolean)=>void}) {
  // const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (!accepted) {
      alert("Please agree to the Terms & Conditions first.");
      return;
    }
    // alert("You have accepted the Terms & Conditions.");
    onClose();
  };

  return (
    <div className="p-6">
      <div className="max-w-xl">
        <h2 className="text-xl font-bold mb-4 border px-2 py-1 mr-10 rounded-md">
          Terms & Conditions
        </h2>

        <div className="space-y-8 text-gray-900">
          <div>
            <h3 className="font-semibold">Room & Property</h3>
            <ul className="list-disc list-inside text-sm ml-2">
              <li>
                Residents are responsible for hostel property (furniture,
                fixtures, electrical items).
              </li>
              <li>
                Any damage or loss will be charged to the resident responsible.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Payment & Fees</h3>
            <ul className="list-disc list-inside text-sm ml-2">
              <li>Rent must be paid before the 5th of every month.</li>
              <li>Late payments will attract a fine as per hostel policy.</li>
              <li>
                Security deposit is non-refundable in case of disciplinary
                violations.
              </li>
              <li>
                No refund for early check-out or leaving in the middle of the
                month.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Conduct & Behavior</h3>
            <ul className="list-disc list-inside text-sm ml-2">
              <li>
                Respect towards hostel staff and fellow residents is mandatory.
              </li>
              <li>Strictly no fighting, harassment, or abusive behavior.</li>
              <li>
                No illegal activities will be tolerated (theft, drugs, gambling,
                etc.).
              </li>
            </ul>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center mt-5 border w-fit pr-10 py-1 pl-2 rounded-md font-semibold">
          <input
            type="checkbox"
            id="agree"
            checked={accepted}
            onChange={(e) => setAccepted && setAccepted(e.target.checked)}
            className="mr-2 h-4 w-4 border-gray-300 rounded"
          />
          <label htmlFor="agree" className="text-sm">
            I agree to the Terms & Conditions
          </label>
        </div>
      </div>
      {/* Button */}
      <div className="w-full flex justify-end">
        <Button
          onPress={handleContinue}
          isDisabled={!accepted}
          className={`mt-4 px-6 py-2 rounded text-white font-medium ${
            accepted
              ? "bg-red-500 hover:bg-red-600"
              : "bg-red-300 cursor-not-allowed"
          }`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
