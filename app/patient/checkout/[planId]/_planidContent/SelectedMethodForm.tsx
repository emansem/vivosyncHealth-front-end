import Input from "@/src/components/ui/forms/Input";
import React, { ChangeEvent } from "react";
interface PaymentFormProsp {
  handleGetPhoneNumber: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedMethod: string;
  value: string | undefined;
}

function SelectedMethodForm({
  handleGetPhoneNumber,
  selectedMethod,
  value
}: PaymentFormProsp) {
  return (
    <>
      {/* Credit Card Form */}
      {selectedMethod === "credit-card" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Mobile money Gateway */}
      {selectedMethod === "orange" && (
        <div className="w-full">
          <Input
            value={value || ""}
            onChange={handleGetPhoneNumber}
            label="Orange Money Number"
            name="orange-money"
            inputType="text"
            id="orange-money"
          />
        </div>
      )}

      {/* Mobile money Gateway */}
      {selectedMethod === "mtn" && (
        <div className="w-full">
          <Input
            value={value || ""}
            onChange={handleGetPhoneNumber}
            label="Mobile Money Number"
            name="mtn-money"
            inputType="text"
            id="mtn-money"
          />
        </div>
      )}
    </>
  );
}

export default SelectedMethodForm;
