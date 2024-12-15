import { colors } from "@/app/lib/constant";

// Security Section
export const SecuritySection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Security Settings
      </h2>

      <div className="space-y-6">
        {/* Password Change */}
        <div className="p-4 rounded-xl bg-stone-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-stone-800">Password</h3>
              <p className="text-sm text-stone-500 mt-1">
                Last changed 3 months ago
              </p>
            </div>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ color: colors.primary }}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="p-4 rounded-xl bg-stone-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-stone-800">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-stone-500 mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ color: colors.primary }}
            >
              Enable
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">Active Sessions</h3>
          <div className="space-y-3">
            {[
              {
                device: "MacBook Pro",
                location: "New York, USA",
                current: true
              },
              { device: "iPhone 12", location: "New York, USA", current: false }
            ].map((session, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 rounded-xl bg-stone-50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-stone-800">
                      {session.device}
                    </p>
                    {session.current && (
                      <span
                        className="text-xs bg-secondary px-2 py-1 rounded-full font-medium"
                        style={{ color: colors.primary }}
                      >
                        Current Device
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 mt-1">
                    {session.location}
                  </p>
                </div>
                {!session.current && (
                  <button className="text-sm font-medium text-red-600">
                    End Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
