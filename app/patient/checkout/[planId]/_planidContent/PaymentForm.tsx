import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PaymentMethod } from "../page";
import SelectedMethodForm from "./SelectedMethodForm";
interface PaymentFormProps {
  handleGetPhoneNumber: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedMethod: string;
  value?: string | undefined;
  amountValue?: string;
  phoneNumberValue?: string;
  paymentMethods: PaymentMethod[];
  setSelectedMethod: Dispatch<SetStateAction<string>>;
  amountInput?: boolean;
}

// Payment form component
export const PaymentForm = ({
  handleGetPhoneNumber,
  paymentMethods,
  selectedMethod,
  value,
  amountValue,
  phoneNumberValue,
  amountInput = false,
  setSelectedMethod
}: PaymentFormProps) => {
  return (
    <div className="w-full">
      {/* Payment Method Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            // const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-2 md:p-3 block rounded-lg border-2 transition-all ${
                  selectedMethod === method.id
                    ? "border-primary_color bg-primary_color bg-opacity-5"
                    : "border-gray-200 hover:border-primary_color"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {/* <Icon
                    className={`h-6 w-6 ${
                      selectedMethod === method.id
                        ? "text-primary_color"
                        : "text-gray-600"
                    }`}
                  /> */}
                  <span className="text-sm">{method.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <SelectedMethodForm
        value={value}
        amountValue={amountValue}
        phoneNumberValue={phoneNumberValue}
        amountInput={amountInput}
        handleGetPhoneNumber={handleGetPhoneNumber}
        selectedMethod={selectedMethod}
      />
    </div>
  );
};
