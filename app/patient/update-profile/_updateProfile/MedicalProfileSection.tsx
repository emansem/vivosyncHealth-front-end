import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

// Medical Profile Section
export const MedicalProfileSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">Medical Profile</h2>

      <div className="space-y-6">
        {/* Emergency Contact */}
        <div className="p-4 rounded-xl bg-stone-50">
          <h3 className="font-medium text-stone-800 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                defaultValue="Jane Doe"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Relationship
              </label>
              <input
                type="text"
                defaultValue="Spouse"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 000-0001"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Medical Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Blood Type
              </label>
              <select className="w-full p-3 rounded-xl border border-stone-200">
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Allergies
              </label>
              <input
                type="text"
                placeholder="Enter any allergies"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Current Medications
              </label>
              <textarea
                rows={3}
                placeholder="List your current medications"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Medical Profile
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
