import { colors } from "@/app/lib/constant";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { Plus, Settings } from "lucide-react";

export const FeesSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Fees & Discounts
      </h2>

      <div className="space-y-6">
        {/* Regular Consultation Fees */}
        <div className="p-4 rounded-xl bg-stone-50">
          <h3 className="font-medium text-stone-800 mb-4">Consultation Fees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Video Consultation Fee
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-l-lg text-stone-600">
                  $
                </span>
                <input
                  type="number"
                  placeholder="100"
                  className="flex-1 p-2 border border-l-0 border-stone-200 rounded-r-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                In-Person Consultation Fee
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-l-lg text-stone-600">
                  $
                </span>
                <input
                  type="number"
                  placeholder="150"
                  className="flex-1 p-2 border border-l-0 border-stone-200 rounded-r-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Discount Settings */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-stone-800">Discount Programs</h3>
            <button
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              Add Discount
            </button>
          </div>

          <div className="space-y-4">
            {[
              { name: "Senior Citizens", discount: "20%", status: "active" },
              { name: "Children under 12", discount: "15%", status: "active" },
              {
                name: "New Patient Special",
                discount: "10%",
                status: "inactive"
              }
            ].map((discount, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-stone-50 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-stone-800">
                    {discount.name}
                  </h4>
                  <p className="text-sm text-stone-500">
                    {discount.discount} off regular fee
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      discount.status === "active"
                        ? "bg-secondary text-primary"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {discount.status}
                  </div>
                  <button className="text-stone-400 hover:text-stone-600">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Rates */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-stone-800">Package Rates</h3>
            <button
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              Add Package
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "3 Sessions Package",
                price: "$250",
                savings: "Save 15%"
              },
              { name: "5 Sessions Package", price: "$400", savings: "Save 20%" }
            ].map((package_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-stone-50 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-stone-800">
                    {package_.name}
                  </h4>
                  <p className="text-sm text-stone-500">
                    {package_.price} - {package_.savings}
                  </p>
                </div>
                <button className="text-stone-400 hover:text-stone-600">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Fee Settings
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
