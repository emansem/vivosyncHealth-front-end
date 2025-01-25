import { colors } from "@/app/lib/constant";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { Plus } from "lucide-react";

export // Message Templates Section
const TemplatesSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Message Templates
      </h2>

      <div className="space-y-6">
        {/* Appointment Templates */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Appointment Messages
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "Appointment Confirmation",
                template:
                  "Dear [Patient Name], Your appointment is confirmed for [Date] at [Time]."
              },
              {
                title: "Appointment Reminder",
                template:
                  "Reminder: You have an appointment tomorrow at [Time]."
              },
              {
                title: "Follow-up Message",
                template:
                  "Thank you for your visit. Here are your follow-up instructions: [Instructions]"
              }
            ].map((template, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-50">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-stone-800">
                    {template.title}
                  </h4>
                  <button
                    className="text-sm font-medium"
                    style={{ color: colors.primary }}
                  >
                    Edit
                  </button>
                </div>
                <textarea
                  defaultValue={template.template}
                  rows={3}
                  className="w-full p-3 rounded-lg border border-stone-200 bg-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Templates */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Newsletter Templates
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-stone-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-stone-800">
                    Monthly Health Tips
                  </h4>
                  <p className="text-sm text-stone-500">
                    Sent on the 1st of every month
                  </p>
                </div>
                <button
                  className="text-sm font-medium"
                  style={{ color: colors.primary }}
                >
                  Edit
                </button>
              </div>
              <textarea
                defaultValue="Dear [Patient Name], Here are this month's health tips..."
                rows={4}
                className="w-full p-3 rounded-lg border border-stone-200 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Custom Templates */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-stone-800">Custom Templates</h3>
            <button
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              Add Template
            </button>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-dashed border-stone-300">
            <p className="text-center text-stone-500">
              Create custom message templates for specific purposes
            </p>
          </div>
        </div>

        {/* Available Variables */}
        <div className="p-4 rounded-xl bg-stone-50">
          <h3 className="font-medium text-stone-800 mb-2">
            Available Variables
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "[Patient Name]",
              "[Date]",
              "[Time]",
              "[Doctor Name]",
              "[Clinic Name]",
              "[Instructions]"
            ].map((variable, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-lg bg-white border border-stone-200 text-sm text-stone-600"
              >
                {variable}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Templates
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
