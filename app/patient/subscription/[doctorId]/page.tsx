// types.ts
type PricingTier = {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
};

type DoctorProfile = {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  experience: number;
  country: string;
  speciality: string;
  languages: string[];
  availability: string[];
  medicalLicense: string;
  about: string;
  pricing: PricingTier[];
};

// DoctorProfile.tsx
import { useState } from "react";
import {
  Calendar,
  Globe2,
  Languages,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  Video,
  Check
} from "lucide-react";

const doctorData: DoctorProfile = {
  id: "1",
  name: "Dr. Eman sem",
  tagline: "Making Clients Reimagine Their Online Presence",
  rating: 5.0,
  reviewCount: 123,
  experience: 16,
  country: "Cameroon",
  speciality: "Doctor",
  languages: ["English", "French", "German"],
  availability: ["Mon", "Tue", "Wed", "Sat"],
  medicalLicense: "DOCTOREXAMPLE",
  about:
    "My expertise lies in integrative medicine, where I blend traditional medical practices with holistic approaches to ensure comprehensive care. Trained at Johns Hopkins, with further specialization in neurology and functional medicine at Harvard. I've seen first-hand the limitations of conventional treatments. This led me to explore and integrate alternative therapies like acupuncture, dietary therapy, and mindfulness, tailoring treatments to not only heal the body but also nurture the mind and spirit.",
  pricing: [
    {
      name: "Basic",
      price: 2000,
      features: [
        "24/7 Customer Support",
        "Up to 50 Patient Records",
        "Basic Appointment Scheduling",
        "Email Notifications",
        "Patient History Access"
      ]
    }
  ]
};

export default function DoctorProfile() {
  const [selectedPricingTier, setSelectedPricingTier] =
    useState<string>("Basic");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 overflow-hidden">
                  <img
                    src="/api/placeholder/96/96"
                    alt="Doctor profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {doctorData.name}
                  </h1>
                  <p className="text-gray-600 mt-1">{doctorData.tagline}</p>
                  <div className="flex items-center mt-3 gap-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">
                        {doctorData.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({doctorData.reviewCount})
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {doctorData.experience} Years Experience
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{doctorData.country}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe2 className="w-5 h-5 text-gray-400" />
                    <span>{doctorData.speciality}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Languages className="w-5 h-5 text-gray-400" />
                    <span>{doctorData.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{doctorData.availability.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                {doctorData.about}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Options</h2>
              <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>Message</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
                  <Video className="w-5 h-5" />
                  <span>Video</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="space-y-6">
                {doctorData.pricing.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-xl border-2 p-6 ${
                      selectedPricingTier === tier.name
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{tier.name}</h3>
                      <div className="text-sm text-green-600">
                        save up to 20%
                      </div>
                    </div>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">${tier.price}</span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="bg-white p-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden">
              <img
                src="/api/placeholder/64/64"
                alt="Doctor profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{doctorData.name}</h1>
              <p className="text-gray-600 text-sm mt-1">{doctorData.tagline}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">
                  {doctorData.rating}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  ({doctorData.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm">Basic Fee</h3>
              <p className="text-xl font-semibold mt-1">
                ${doctorData.pricing[0].price}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm">Available</h3>
              <p className="text-sm mt-1">
                {doctorData.availability.join(", ")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {doctorData.about}
              </p>
            </div>
          </div>

          <div className="flex justify-around py-4 bg-white rounded-xl shadow-sm">
            <button className="p-3 text-blue-600">
              <Phone className="w-6 h-6" />
            </button>
            <button className="p-3 text-green-600">
              <MessageSquare className="w-6 h-6" />
            </button>
            <button className="p-3 text-purple-600">
              <Video className="w-6 h-6" />
            </button>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
