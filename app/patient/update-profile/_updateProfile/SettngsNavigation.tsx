import { colors } from "@/app/lib/constant";
import {
  User,
  Heart,
  Shield,
  Bell,
  CreditCard,
  Languages,
  ChevronRight
} from "lucide-react";

// Navigation Section for Settings
export const SettingsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "medical", label: "Medical Profile", icon: Heart },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "language", label: "Language & Region", icon: Languages }
  ];

  return (
    <div className="bg-white rounded-3xl p-4">
      <nav>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors ${
              activeTab === tab.id ? "bg-secondary" : "hover:bg-stone-50"
            }`}
            style={{
              color: activeTab === tab.id ? colors.primary : colors.stone[700]
            }}
          >
            <div className="flex items-center gap-3">
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        ))}
      </nav>
    </div>
  );
};
