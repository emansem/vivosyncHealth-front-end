import { colors } from "@/app/lib/constant";
import {
  User,
  DollarSign,
  MessageSquare,
  Bell,
  Shield,
  ChevronRight
} from "lucide-react";

export const SettingsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "profile", label: "Professional Profile", icon: User },

    { id: "fees", label: "Fees & Discounts", icon: DollarSign },
    { id: "templates", label: "Message Templates", icon: MessageSquare },
    { id: "notifications", label: "Notifications", icon: Bell },

    { id: "security", label: "Security", icon: Shield }
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
