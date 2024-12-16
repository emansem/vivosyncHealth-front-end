import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

export const LanguageSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Language & Region
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Language
          </label>
          <select className="w-full p-3 rounded-xl border border-stone-200">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Arabic</option>
          </select>
          <p className="mt-2 text-sm text-stone-500">
            Choose your preferred language for the interface
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Time Zone
          </label>
          <select className="w-full p-3 rounded-xl border border-stone-200">
            <option>Eastern Time (UTC-5)</option>
            <option>Pacific Time (UTC-8)</option>
            <option>Central European Time (UTC+1)</option>
            <option>Japan Standard Time (UTC+9)</option>
          </select>
          <p className="mt-2 text-sm text-stone-500">
            Your time zone will be used for notifications and scheduling
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Date Format
          </label>
          <select className="w-full p-3 rounded-xl border border-stone-200">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Preferences
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
