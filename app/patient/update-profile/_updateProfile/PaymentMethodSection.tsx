import { colors } from "@/app/lib/constant";

// Payment Methods Section (Continued)
export const PaymentMethodsSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">Payment Methods</h2>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ color: colors.primary }}
        >
          Add New
        </button>
      </div>

      <div className="space-y-4">
        {[
          { type: "Visa", last4: "4242", expiry: "12/24" },
          { type: "Mastercard", last4: "8888", expiry: "09/25" }
        ].map((card, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 rounded-xl bg-stone-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center">
                {card.type}
              </div>
              <div>
                <p className="font-medium text-stone-800">
                  {card.type} ending in {card.last4}
                </p>
                <p className="text-sm text-stone-500">Expires {card.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="text-sm font-medium"
                style={{ color: colors.primary }}
              >
                Edit
              </button>
              <button className="text-sm font-medium text-red-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
