import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useUpdateData } from "../serviceHook";
import { GENERAL_API_END_POINTS } from "@/app/lib/constant";

interface ChangeWithdrawalPassword {
    newWithdrawalPassword: string;
    currentWithdrawalPassword: string;
    repeatWithdrawalPassword: string;
}

interface AccountPassword {
    newPassword: string;
    currentPassword: string;
    repeatPassword: string;
}
const WITHDRAWAL_PASSWORD_INITIAL_STATE = {
    newWithdrawalPassword: "",
    currentWithdrawalPassword: "",
    repeatWithdrawalPassword: ""
};

const ACCOUNT_PASSWORD_INITIAL_STATE = {
    newPassword: "",
    currentPassword: "",
    repeatPassword: ""
};
export const useUpdateSettings = () => {

    const { mutate: updateWithdrawalPassword, isPending: isSubmitWithdrawalForm } = useUpdateData(GENERAL_API_END_POINTS.UPDATE_WITHDRAWAL_PASSWORD, 'settings')
    const { mutate: updateAccountPassword, isPending: isSubmittingPasswordForm } = useUpdateData(GENERAL_API_END_POINTS.UPDATE_ACCOUNT_PASSWORD, 'settings')
    const [withdrawalPasswordFormData, setWithdrawalPasswordFormData] =
        useState<ChangeWithdrawalPassword>(WITHDRAWAL_PASSWORD_INITIAL_STATE);
    const { handleClosePasswordForm, setIsPasswordDialogOpen, setIsWithdrawalPasswordDialogOpen, handleCloseWithdrawalPasswordForm, handleOpenPasswordForm, handleOpenWithdrawalPasswordForm, isPasswordDialogOpen, isWithdrawalPassWordDialogOpen } = useOpenAndCloseSettingsDailog()

    const [accountPasswordFormData, setAccountPasswordFormData] =
        useState<AccountPassword>(ACCOUNT_PASSWORD_INITIAL_STATE);

    const handleOnchangeWithdrawalPassword = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setWithdrawalPasswordFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOnchangeAccountlPassword = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setAccountPasswordFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submitWithdrawalPasswordForm = () => {
        if (Object.values(withdrawalPasswordFormData).some(item => !item)) {
            return toast.error("Please fill all the inputs")
        }
        updateWithdrawalPassword(withdrawalPasswordFormData, {
            onSuccess: (result) => {
                toast.success(result.data.message)
                setTimeout(() => setIsWithdrawalPasswordDialogOpen(false), 400);
            }
        })
    }

    const submitAccountPasswordForm = () => {
        if (Object.values(accountPasswordFormData).some(item => !item)) {
            return toast.error("Please fill all the inputs")
        }

        updateAccountPassword(accountPasswordFormData, {
            onSuccess: (result) => {
                toast.success(result.data.message)
                setTimeout(() => setIsPasswordDialogOpen(false), 400);
            }
        })
    }


    return { handleOnchangeAccountlPassword, isSubmittingPasswordForm, handleClosePasswordForm, handleCloseWithdrawalPasswordForm, handleOpenPasswordForm, handleOpenWithdrawalPasswordForm, isPasswordDialogOpen, isWithdrawalPassWordDialogOpen, isSubmitWithdrawalForm, submitAccountPasswordForm, submitWithdrawalPasswordForm, handleOnchangeWithdrawalPassword }
}


const useOpenAndCloseSettingsDailog = () => {
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [isWithdrawalPassWordDialogOpen, setIsWithdrawalPasswordDialogOpen] =
        useState(false);

    const handleOpenWithdrawalPasswordForm = () => setIsWithdrawalPasswordDialogOpen(true);
    const handleCloseWithdrawalPasswordForm = () => setIsWithdrawalPasswordDialogOpen(false);
    const handleOpenPasswordForm = () => setIsPasswordDialogOpen(true);
    const handleClosePasswordForm = () => setIsPasswordDialogOpen(false);

    return { handleClosePasswordForm, setIsPasswordDialogOpen, setIsWithdrawalPasswordDialogOpen, handleCloseWithdrawalPasswordForm, handleOpenPasswordForm, handleOpenWithdrawalPasswordForm, isPasswordDialogOpen, isWithdrawalPassWordDialogOpen }

}