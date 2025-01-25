import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

// Notifications Section
export const NotificationsSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">Notifications</h2>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="p-4 rounded-xl bg-stone-50">
          <h3 className="font-medium text-stone-800 mb-4">
            Email Notifications
          </h3>
          <div className="space-y-4">
            {[
              { label: "New Appointment Requests", enabled: true },
              { label: "Appointment Reminders", enabled: true },
              { label: "Patient Messages", enabled: true },
              { label: "System Updates", enabled: false }
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-stone-700">{setting.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={setting.enabled}
                  className="rounded border-stone-300 text-primary"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="p-4 rounded-xl bg-stone-50">
          <h3 className="font-medium text-stone-800 mb-4">SMS Notifications</h3>
          <div className="space-y-4">
            {[
              { label: "Urgent Messages", enabled: true },
              { label: "Appointment Changes", enabled: true }
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-stone-700">{setting.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={setting.enabled}
                  className="rounded border-stone-300 text-primary"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Notification Settings
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
