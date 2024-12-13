"use client";

import {
  CHANGE_PASSWORD_INPUTS,
  CHANGE_WITHDRAWAL_PASSWORD,
  colors
} from "@/app/lib/constant";
import { DailogForm } from "./DailogForm";
import { Button } from "@/src/components/utils/Button";
import { Card } from "../profile/_profileCOntent/ReusableContent";
import { useUpdateSettings } from "@/src/hooks/authentication/useUpdateSettings";

// Main Settings Page Component
export default function DoctorSettings() {
  const {
    handleCloseWithdrawalPasswordForm,
    handleOpenPasswordForm,
    handleOpenWithdrawalPasswordForm,
    handleClosePasswordForm,
    isPasswordDialogOpen,
    isSubmittingPasswordForm,
    isWithdrawalPassWordDialogOpen,
    handleOnchangeAccountlPassword,
    submitAccountPasswordForm,
    submitWithdrawalPasswordForm,
    isSubmitWithdrawalForm,
    handleOnchangeWithdrawalPassword
  } = useUpdateSettings();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`mb-8 text-3xl font-bold text-[${colors.primary}]`}>
        Settings
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Account Details Card */}
        <Card className="p-6">
          <h2
            className={`text-xl font-semibold text-[${colors.stone[900]}] mb-4`}
          >
            Email Address
          </h2>
          <p className={`mb-4 text-[${colors.stone[600]}]`}>
            Update your email address for account notifications
          </p>
          <Button
            fullWidth
            onClick={() => {
              /* Navigate to profile */
            }}
          >
            Update Profile
          </Button>
        </Card>

        {/* Withdrawal Password Card */}
        <Card className="p-6">
          <h2
            className={`text-xl font-semibold text-[${colors.stone[900]}] mb-4`}
          >
            Account Password
          </h2>
          <p className={`mb-4 text-[${colors.stone[600]}]`}>
            Change your account password for enhanced security
          </p>
          <Button fullWidth onClick={handleOpenPasswordForm}>
            Update Password
          </Button>
        </Card>

        {/* Email Address Card */}
        <Card className="p-6">
          <h2
            className={`text-xl font-semibold text-[${colors.stone[900]}] mb-4`}
          >
            Withdrawal Password
          </h2>
          <p className={`mb-4 text-[${colors.stone[600]}]`}>
            Change your withdrawal password for enhanced security
          </p>
          <Button fullWidth onClick={handleOpenWithdrawalPasswordForm}>
            Update Withdrawal Password
          </Button>
        </Card>
      </div>

      {/* Dialogs */}
      <DailogForm
        isSubmitting={isSubmittingPasswordForm}
        onSubmit={submitAccountPasswordForm}
        onChange={handleOnchangeAccountlPassword}
        isOpen={isPasswordDialogOpen}
        onClose={handleClosePasswordForm}
        inputsFields={CHANGE_PASSWORD_INPUTS}
        title="Update Account Password"
      />

      <DailogForm
        isSubmitting={isSubmitWithdrawalForm}
        onSubmit={submitWithdrawalPasswordForm}
        onChange={handleOnchangeWithdrawalPassword}
        isOpen={isWithdrawalPassWordDialogOpen}
        onClose={handleCloseWithdrawalPasswordForm}
        inputsFields={CHANGE_WITHDRAWAL_PASSWORD}
        title="Update Withdrawal Password"
      />

      {/* Toast */}
    </div>
  );
}
