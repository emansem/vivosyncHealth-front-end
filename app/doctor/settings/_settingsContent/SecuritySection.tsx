import { colors } from "@/app/lib/constant";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { useState } from "react";

export const SecuritySection = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [withdrawalPasswordForm, setWithdrawalPasswordForm] = useState({
    password: "",
    confirm: ""
  });

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleWithdrawalPasswordChange = (e) => {
    setWithdrawalPasswordForm({
      ...withdrawalPasswordForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Security Settings
      </h2>

      <div className="space-y-6">
        {/* Password Settings */}
        <div className="p-4 rounded-xl bg-stone-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-stone-800">Password</h3>
              <p className="text-sm text-stone-500">
                Change your account password
              </p>
            </div>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              Change Password
            </button>
          </div>

          {showChangePassword && (
            <div className="space-y-4">
              <input
                type="password"
                name="current"
                placeholder="Current Password"
                value={passwordForm.current}
                onChange={handlePasswordChange}
                className="w-full p-3 rounded-lg border border-stone-200"
              />
              <input
                type="password"
                name="new"
                placeholder="New Password"
                value={passwordForm.new}
                onChange={handlePasswordChange}
                className="w-full p-3 rounded-lg border border-stone-200"
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm New Password"
                value={passwordForm.confirm}
                onChange={handlePasswordChange}
                className="w-full p-3 rounded-lg border border-stone-200"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordForm({ current: "", new: "", confirm: "" });
                  }}
                  className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <PrimaryButton backgroud color="text-white">
                  Update Password
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>

        {/* Withdrawal Password */}
        <div className="p-4 rounded-xl bg-stone-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-stone-800">
                Withdrawal Password
              </h3>
              <p className="text-sm text-stone-500">
                Set password for withdrawals
              </p>
            </div>
            <button
              onClick={() => setShowWithdrawalPassword(!showWithdrawalPassword)}
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              {showWithdrawalPassword ? "Cancel" : "Set Password"}
            </button>
          </div>

          {showWithdrawalPassword && (
            <div className="space-y-4">
              <input
                type="password"
                name="password"
                placeholder="New Withdrawal Password"
                value={withdrawalPasswordForm.password}
                onChange={handleWithdrawalPasswordChange}
                className="w-full p-3 rounded-lg border border-stone-200"
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Withdrawal Password"
                value={withdrawalPasswordForm.confirm}
                onChange={handleWithdrawalPasswordChange}
                className="w-full p-3 rounded-lg border border-stone-200"
              />
              <div className="flex justify-end">
                <PrimaryButton backgroud color="text-white">
                  Set Withdrawal Password
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
