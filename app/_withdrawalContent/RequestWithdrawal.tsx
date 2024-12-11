"use client";

import { X } from "lucide-react";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WITHDRAWAL_FORM_INPUTS
} from "../lib/constant";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { useRequestWithdrawal } from "@/src/hooks/withdrawalAccount/useRequestWithdrawal";

interface WithdrawalFormProps {
  onClose: () => void;
}

const WithdrawalForm = ({ onClose }: WithdrawalFormProps) => {
  const { handleInputChange, accountName, accountNumber, handleSubmit } =
    useRequestWithdrawal();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>
              Withdraw Funds
            </h1>
            <p className="text-sm text-gray-600">
              Please enter your withdrawal details below
            </p>
          </div>

          {/* Enhanced Bank Account Card */}
          <div
            className="relative overflow-hidden rounded-xl p-6"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_COLOR}dd)`
            }}
          >
            {/* Decorative Elements */}
            <div
              className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-8 rounded-full"
              style={{
                background: `radial-gradient(circle, ${SECONDARY_COLOR}44 0%, ${SECONDARY_COLOR}11 70%)`
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-12 translate-y-12 rounded-full"
              style={{
                background: `radial-gradient(circle, ${SECONDARY_COLOR}44 0%, ${SECONDARY_COLOR}11 70%)`
              }}
            />

            {/* Bank Information */}
            <div className="relative space-y-4">
              {/* Account Details */}
              <div className="space-y-3">
                {/* Account Name Section */}
                <div className="space-y-1">
                  <p className="text-white/70 text-xs uppercase tracking-wider">
                    Account Name
                  </p>
                  <p className="text-white font-medium">{accountName}</p>
                </div>

                {/* Account Number Section */}
                <div className="space-y-1">
                  <p className="text-white/70 text-xs uppercase tracking-wider">
                    Account Number
                  </p>
                  <p className="text-white font-medium tracking-wider">
                    {accountNumber?.toString().slice(0, 4)}**** ****
                  </p>
                </div>
              </div>

              {/* Card Footer Design Element */}
              <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4">
                <div
                  className="w-16 h-16 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${SECONDARY_COLOR}33 0%, transparent 70%)`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Withdrawal Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              {WITHDRAWAL_FORM_INPUTS.map((item) => (
                <Input
                  onChange={handleInputChange}
                  key={item.name}
                  inputPlaceholder={item.placeHolder}
                  inputType={item.type}
                  name={item.name}
                  label={item.label}
                />
              ))}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm inline-block py-0 hover:underline transition-colors"
                style={{ color: PRIMARY_COLOR }}
              >
                Forgot withdrawal password?
              </a>
            </div>

            {/* Submit Button */}
            <PrimaryButton backgroud color="text-white">
              Withdrawal Funds
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalForm;
