import { colors } from "@/app/lib/constant";

// Notifications Section
export const NotificationsSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        {[
          {
            title: "Appointment Reminders",
            description: "Get notified about upcoming appointments"
          },
          {
            title: "Medication Reminders",
            description: "Receive alerts for medication schedules"
          },
          {
            title: "Test Results",
            description: "Be notified when new test results are available"
          },
          {
            title: "Health Tips",
            description: "Receive personalized health tips and advice"
          }
        ].map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-start p-4 rounded-xl bg-stone-50"
          >
            <div>
              <h3 className="font-medium text-stone-800">{item.title}</h3>
              <p className="text-sm text-stone-500 mt-1">{item.description}</p>
            </div>
            <div
              className="w-12 h-6 rounded-full relative cursor-pointer bg-secondary"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
