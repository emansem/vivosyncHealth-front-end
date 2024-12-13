import { colors } from "@/app/lib/constant";
import { ReactNode, useEffect } from "react";
import { createContext } from "react";

// Custom Dialog Component
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

// Custom Dialog Context
const DialogContext = createContext<{
  isOpen: boolean;
  onClose: () => void;
}>({
  isOpen: false,
  onClose: () => {}
});

export const Dialog = ({ isOpen, onClose, children, title }: DialogProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <DialogContext.Provider value={{ isOpen, onClose }}>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
            onClick={onClose}
          />

          {/* Dialog Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            {title && (
              <div className="mb-4">
                <h3
                  className={`text-lg font-medium text-[${colors.stone[900]}]`}
                >
                  {title}
                </h3>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </DialogContext.Provider>
  );
};
