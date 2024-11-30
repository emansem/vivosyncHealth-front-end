import React from "react";
import { Plus, Settings, ArrowDown, ArrowUp, Share2 } from "lucide-react";

const ProfileHeader = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 bg-white rounded-3xl">
    <div className="flex items-center gap-4">
      <img
        src="/api/placeholder/80/80"
        alt="Profile"
        className="w-20 h-20 rounded-2xl object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-gray-500 text-sm">ID: #123456</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary_color text-primary_color hover:bg-primary_color/10 font-medium">
        <Settings className="w-4 h-4" />
        Edit profile
      </button>
    </div>
  </div>
);

const BalanceSection = () => (
  <div className="bg-gradient-to-br from-[#269c65] to-[#1a724a] rounded-3xl p-8">
    <div className="flex flex-col md:flex-row justify-between gap-6">
      <div>
        <p className="text-green-100 text-sm font-medium">Available Balance</p>
        <div className="flex items-baseline gap-3 mt-1">
          <h2 className="text-4xl font-bold text-white">$2,450.85</h2>
          <span className="text-green-100">USD</span>
        </div>
      </div>
      <button className="bg-white text-[#269c65] px-6 py-3 rounded-xl font-medium flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Balance
      </button>
    </div>
  </div>
);

const InviteSection = () => (
  <div className="bg-white rounded-3xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold">Invite Friends</h2>
        <p className="text-gray-500 text-sm mt-1">Get $50 for each referral</p>
      </div>
      <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#269c65] text-white font-medium">
        <Share2 className="w-4 h-4" />
        Share Invite
      </button>
    </div>
  </div>
);

const TransactionItem = ({ title, date, amount, type, status }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl">
    <div className="flex gap-4 items-center">
      <div
        className={`p-3 rounded-xl \${amount > 0 ? 'bg-[#269c65]/10' : 'bg-gray-100'}`}
      >
        {amount > 0 ? (
          <ArrowDown className="w-5 h-5 text-[#269c65]" />
        ) : (
          <ArrowUp className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">{type}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className={`font-medium ${amount > 0 ? "text-[#269c65]" : ""}`}>
        {amount > 0 ? "+" : ""}
        {amount.toFixed(2)} USD
      </p>
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          status === "Completed"
            ? "bg-[#269c65]/10 text-[#269c65]"
            : "bg-yellow-50 text-yellow-600"
        }`}
      >
        {status}
      </span>
    </div>
  </div>
);

const SubscriptionItem = ({ title, features, price, nextPayment, image }) => (
  <div className="p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
    <div className="flex gap-4 items-start">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map((feature, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              ${price}
              <span className="text-sm text-gray-500">/mo</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">Next: {nextPayment}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PatientDashboard = () => (
  <div className="min-h-screen bg-gray-50/50">
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <BalanceSection />
          <InviteSection />

          <div className="bg-white rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <p className="text-gray-500 text-sm">Your latest activities</p>
              </div>
              <button className="text-[#269c65] font-medium">View All</button>
            </div>
            <div className="space-y-2">
              {[
                {
                  title: "Video Consultation",
                  type: "Service",
                  amount: -80,
                  date: "2 mins ago",
                  status: "Processing"
                },
                {
                  title: "Account Top Up",
                  type: "Deposit",
                  amount: 500,
                  date: "2 hours ago",
                  status: "Completed"
                },
                {
                  title: "Chat Session",
                  type: "Service",
                  amount: -40,
                  date: "Yesterday",
                  status: "Completed"
                }
              ].map((tx, i) => (
                <TransactionItem key={i} {...tx} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Active Subscriptions</h2>
                <p className="text-gray-500 text-sm">Your current plans</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Premium Health Plan",
                  features: ["Unlimited Chat", "Video Calls", "24/7 Support"],
                  price: 99.99,
                  nextPayment: "Dec 01",
                  image: "/api/placeholder/64/64"
                },
                {
                  title: "Specialist Access",
                  features: ["Expert Consultation", "Priority Support"],
                  price: 49.99,
                  nextPayment: "Dec 05",
                  image: "/api/placeholder/64/64"
                }
              ].map((sub, i) => (
                <SubscriptionItem key={i} {...sub} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PatientDashboard;
