"use client";
import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle,
  Wallet,
  Lock,
  BadgeJapaneseYen
} from "lucide-react";

// Types for our checkout components
interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface OrderSummaryItem {
  name: string;
  duration: string;
  price: number;
}

// Payment form component
const PaymentForm = () => {
  const [selectedMethod, setSelectedMethod] = useState("credit-card");

  const paymentMethods: PaymentMethod[] = [
    { id: "credit-card", name: "Credit Card", icon: CreditCard },
    { id: "paypal", name: "PayPal", icon: BadgeJapaneseYen },
    { id: "bank", name: "Bank Transfer", icon: Wallet }
  ];

  return (
    <div className="w-full max-w-md">
      {/* Payment Method Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === method.id
                    ? "border-primary_color bg-primary_color bg-opacity-5"
                    : "border-gray-200 hover:border-primary_color"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon
                    className={`h-6 w-6 ${
                      selectedMethod === method.id
                        ? "text-primary_color"
                        : "text-gray-600"
                    }`}
                  />
                  <span className="text-sm">{method.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

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

      {/* PayPal Form */}
      {selectedMethod === "paypal" && (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <BadgeJapaneseYen className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">
            You will be redirected to PayPal to complete your payment.
          </p>
        </div>
      )}

      {/* Bank Transfer Form */}
      {selectedMethod === "bank" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Routing Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Order Summary component
const OrderSummary = ({ selectedPlan }: { selectedPlan: OrderSummaryItem }) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg space-y-6">
      <h3 className="text-lg font-semibold">Order Summary</h3>

      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="font-medium">{selectedPlan.name}</p>
            <p className="text-sm text-gray-600">{selectedPlan.duration}</p>
          </div>
          <span className="font-medium">${selectedPlan.price}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${selectedPlan.price}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Tax</span>
            <span>${(selectedPlan.price * 0.1).toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${(selectedPlan.price * 1.1).toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Billed {selectedPlan.duration.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Features included */}
      <div className="space-y-3">
        <p className="font-medium">Plan Features:</p>
        {[
          "Unlimited patients",
          "Priority support",
          "Advanced analytics",
          "Custom branding"
        ].map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-gray-600"
          >
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Checkout Page
const CheckoutPage = () => {
  const selectedPlan = {
    name: "Premium Plan",
    duration: "Annually",
    price: 299
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="flex items-center text-gray-600">
            <Lock className="h-4 w-4 mr-2" />
            <span>Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Payment Form */}
          <div>
            <PaymentForm />

            <button className="w-full mt-8 px-6 py-3 bg-primary_color text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Complete Payment</span>
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Your payment info is securely encrypted
            </p>
          </div>

          {/* Right side - Order Summary */}
          <div>
            <OrderSummary selectedPlan={selectedPlan} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
