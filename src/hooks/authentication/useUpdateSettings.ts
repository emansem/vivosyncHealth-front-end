import { useState, ChangeEvent, useCallback } from "react";
import toast from "react-hot-toast";
import { useUpdateData } from "../serviceHook";
import { GENERAL_API_END_POINTS } from "@/app/lib/constant";

/**
 * Interface for withdrawal password form data
 */
interface ChangeWithdrawalPassword {
    newWithdrawalPassword: string;
    currentWithdrawalPassword: string;
    repeatWithdrawalPassword: string;
}

/**
 * Interface for account password form data
 */
interface AccountPassword {
    newPassword: string;
    currentPassword: string;
    repeatPassword: string;
}

/**
 * Initial state for withdrawal password form
 */
const WITHDRAWAL_PASSWORD_INITIAL_STATE: ChangeWithdrawalPassword = {
    newWithdrawalPassword: "",
    currentWithdrawalPassword: "",
    repeatWithdrawalPassword: ""
};

/**
 * Initial state for account password form
 */
const ACCOUNT_PASSWORD_INITIAL_STATE: AccountPassword = {
    newPassword: "",
    currentPassword: "",
    repeatPassword: ""
};

/**
 * Validates account password data
 * @param data Account password form data
 * @returns Object containing validation errors if any
 */
const validateAccountPassword = (data: AccountPassword): string => {
    let errors: string = ''

    // Validate current password
    if (!data.currentPassword.trim()) {
        errors = "Current password is required";
    }

    // Validate new password
    if (!data.newPassword) {
        errors = "New password is required";
    } else if (data.newPassword.length < 8) {
        errors = "Password must be at least 8 characters";
    }

    // Validate password match
    if (data.newPassword !== data.repeatPassword) {
        errors = "Passwords do not match";
    }

    if (data.newPassword.length < 6 || data.repeatPassword.length < 6) {
        errors = "Password must be at least 6 characters";
    }

    return errors;
};

/**
 * Validates withdrawal password data
 * @param data Withdrawal password form data
 * @returns string containing validation errors if any
 */
const validateWithdrawalPassword = (data: ChangeWithdrawalPassword): string => {
    let errors: string = '';

    // Validate all required fields
    if (!data.currentWithdrawalPassword.trim()) {
        errors = "Current withdrawal password is required";
    }
    if (!data.newWithdrawalPassword) {
        errors = "New withdrawal password is required";
    }
    if (data.newWithdrawalPassword !== data.repeatWithdrawalPassword) {
        errors = "Withdrawal passwords do not match";
    }
    if (data.newWithdrawalPassword.length < 6 || data.repeatWithdrawalPassword.length < 6) {
        errors = "Password must be at least 6 characters";
    }

    return errors;
};

/**
 * Main hook for managing password updates in settings
 * Handles both account and withdrawal password updates
 */
export const useUpdateSettings = () => {
    // API mutation hooks
    const { mutate: updateWithdrawalPassword, isPending: isSubmitWithdrawalForm } =
        useUpdateData(GENERAL_API_END_POINTS.UPDATE_WITHDRAWAL_PASSWORD, 'settings');
    const { mutate: updateAccountPassword, isPending: isSubmittingPasswordForm } =
        useUpdateData(GENERAL_API_END_POINTS.UPDATE_ACCOUNT_PASSWORD, 'settings');

    // Form states
    const [withdrawalPasswordFormData, setWithdrawalPasswordFormData] =
        useState<ChangeWithdrawalPassword>(WITHDRAWAL_PASSWORD_INITIAL_STATE);
    const [accountPasswordFormData, setAccountPasswordFormData] =
        useState<AccountPassword>(ACCOUNT_PASSWORD_INITIAL_STATE);

    // Dialog states
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [isWithdrawalPasswordDialogOpen, setIsWithdrawalPasswordDialogOpen] =
        useState(false);

    /**
     * Handles withdrawal password form input changes
     */
    const handleOnchangeWithdrawalPassword = useCallback((
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setWithdrawalPasswordFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    /**
     * Handles account password form input changes
     */
    const handleOnchangeAccountPassword = useCallback((
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setAccountPasswordFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    /**
     * Submits withdrawal password form after validation
     */
    const submitWithdrawalPasswordForm = useCallback(() => {
        const errors = validateWithdrawalPassword(withdrawalPasswordFormData);
        if (errors) {
            return toast.error(errors)
        }

        updateWithdrawalPassword(withdrawalPasswordFormData, {
            onSuccess: (result) => {
                toast.success(result.data.message);
                setWithdrawalPasswordFormData(WITHDRAWAL_PASSWORD_INITIAL_STATE);
                setTimeout(() => setIsWithdrawalPasswordDialogOpen(false), 400);
            },

        });
    }, [withdrawalPasswordFormData, updateWithdrawalPassword]);

    /**
     * Submits account password form after validation
     */
    const submitAccountPasswordForm = useCallback(() => {
        const errors = validateAccountPassword(accountPasswordFormData);

        if (errors) {
            return toast.error(errors)
        }

        updateAccountPassword(accountPasswordFormData, {
            onSuccess: (result) => {
                toast.success(result.data.message);
                setAccountPasswordFormData(ACCOUNT_PASSWORD_INITIAL_STATE);
                setTimeout(() => setIsPasswordDialogOpen(false), 400);
            },

        });
    }, [accountPasswordFormData, updateAccountPassword]);

    // Dialog handlers
    const handleOpenWithdrawalPasswordForm = useCallback(() =>
        setIsWithdrawalPasswordDialogOpen(true), []);
    const handleCloseWithdrawalPasswordForm = useCallback(() =>
        setIsWithdrawalPasswordDialogOpen(false), []);
    const handleOpenPasswordForm = useCallback(() =>
        setIsPasswordDialogOpen(true), []);
    const handleClosePasswordForm = useCallback(() =>
        setIsPasswordDialogOpen(false), []);

    return {
        // Form states
        withdrawalPasswordFormData,
        accountPasswordFormData,

        // Loading states
        isSubmitWithdrawalForm,
        isSubmittingPasswordForm,

        // Dialog states
        isPasswordDialogOpen,
        isWithdrawalPasswordDialogOpen,

        // Form handlers
        handleOnchangeAccountPassword,
        handleOnchangeWithdrawalPassword,
        submitAccountPasswordForm,
        submitWithdrawalPasswordForm,

        // Dialog handlers
        handleOpenPasswordForm,
        handleClosePasswordForm,
        handleOpenWithdrawalPasswordForm,
        handleCloseWithdrawalPasswordForm
    };
};