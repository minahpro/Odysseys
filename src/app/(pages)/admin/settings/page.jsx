"use client";

import { useState } from "react";
import {
  Save,
  Globe,
  Mail,
  Search,
  CreditCard,
  Shield,
  Bell,
} from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Wild Odysseys",
    siteDescription:
      "Discover the magic of Tanzania with our expertly crafted safari and adventure tours",
    siteUrl: "https://wildodysseys.com",
    timezone: "Africa/Dar_es_Salaam",
    language: "en",
    currency: "USD",

    // Contact Settings
    contactEmail: "info@wildodysseys.com",
    contactPhone: "+255 123 456 789",
    contactAddress: "Arusha, Tanzania",
    supportEmail: "support@wildodysseys.com",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    smtpEncryption: "tls",
    fromEmail: "noreply@wildodysseys.com",
    fromName: "Wild Odysseys",

    // SEO Settings
    metaTitle: "Wild Odysseys - Tanzania Safari & Adventure Tours",
    metaDescription:
      "Experience the best of Tanzania with our safari tours, Kilimanjaro treks, and Zanzibar adventures. Book your dream African adventure today!",
    metaKeywords:
      "Tanzania safari, Kilimanjaro trekking, Zanzibar tours, African adventure",
    googleAnalytics: "",
    facebookPixel: "",

    // Booking Settings
    bookingEnabled: true,
    requireDeposit: true,
    depositPercentage: "30",
    cancellationPolicy: "Free cancellation up to 48 hours before the tour",
    paymentMethods: ["credit_card", "paypal", "bank_transfer"],

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: "60",
    passwordMinLength: "8",
    loginAttempts: "5",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true,

    // Social Media
    facebookUrl: "https://facebook.com/wildodysseys",
    twitterUrl: "https://twitter.com/wildodysseys",
    instagramUrl: "https://instagram.com/wildodysseys",
    youtubeUrl: "",
  });

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "email", label: "Email", icon: Mail },
    { id: "seo", label: "SEO", icon: Search },
    { id: "booking", label: "Booking", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleInputChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    // Save settings logic here
    alert("Settings saved successfully!");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    handleInputChange("siteName", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Site URL
                </label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => handleInputChange("siteUrl", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  handleInputChange("siteDescription", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    handleInputChange("timezone", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                >
                  <option value="Africa/Dar_es_Salaam">
                    Africa/Dar es Salaam
                  </option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New York</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    handleInputChange("language", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                >
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) =>
                    handleInputChange("currency", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="TZS">TZS</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    handleInputChange("contactEmail", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    handleInputChange("supportEmail", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) =>
                    handleInputChange("contactPhone", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.contactAddress}
                  onChange={(e) =>
                    handleInputChange("contactAddress", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>
            <div>
              <h3 className="font-quicksand font-semibold text-gray-900 mb-4">
                Social Media Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settings.facebookUrl}
                    onChange={(e) =>
                      handleInputChange("facebookUrl", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) =>
                      handleInputChange("instagramUrl", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={settings.smtpHost}
                  onChange={(e) =>
                    handleInputChange("smtpHost", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  SMTP Port
                </label>
                <input
                  type="text"
                  value={settings.smtpPort}
                  onChange={(e) =>
                    handleInputChange("smtpPort", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  SMTP Username
                </label>
                <input
                  type="text"
                  value={settings.smtpUsername}
                  onChange={(e) =>
                    handleInputChange("smtpUsername", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  SMTP Password
                </label>
                <input
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) =>
                    handleInputChange("smtpPassword", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Encryption
                </label>
                <select
                  value={settings.smtpEncryption}
                  onChange={(e) =>
                    handleInputChange("smtpEncryption", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  From Email
                </label>
                <input
                  type="email"
                  value={settings.fromEmail}
                  onChange={(e) =>
                    handleInputChange("fromEmail", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  From Name
                </label>
                <input
                  type="text"
                  value={settings.fromName}
                  onChange={(e) =>
                    handleInputChange("fromName", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>
          </div>
        );

      case "seo":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
              />
            </div>
            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={settings.metaDescription}
                onChange={(e) =>
                  handleInputChange("metaDescription", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
              />
            </div>
            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Meta Keywords
              </label>
              <input
                type="text"
                value={settings.metaKeywords}
                onChange={(e) =>
                  handleInputChange("metaKeywords", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                placeholder="Separate keywords with commas"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={settings.googleAnalytics}
                  onChange={(e) =>
                    handleInputChange("googleAnalytics", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                  placeholder="GA-XXXXXXXXX-X"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.facebookPixel}
                  onChange={(e) =>
                    handleInputChange("facebookPixel", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>
          </div>
        );

      case "booking":
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bookingEnabled"
                checked={settings.bookingEnabled}
                onChange={(e) =>
                  handleInputChange("bookingEnabled", e.target.checked)
                }
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="bookingEnabled"
                className="ml-2 font-quicksand text-gray-700"
              >
                Enable online booking
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireDeposit"
                checked={settings.requireDeposit}
                onChange={(e) =>
                  handleInputChange("requireDeposit", e.target.checked)
                }
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="requireDeposit"
                className="ml-2 font-quicksand text-gray-700"
              >
                Require deposit for bookings
              </label>
            </div>
            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Deposit Percentage (%)
              </label>
              <input
                type="number"
                value={settings.depositPercentage}
                onChange={(e) =>
                  handleInputChange("depositPercentage", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Cancellation Policy
              </label>
              <textarea
                value={settings.cancellationPolicy}
                onChange={(e) =>
                  handleInputChange("cancellationPolicy", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
              />
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onChange={(e) =>
                  handleInputChange("twoFactorAuth", e.target.checked)
                }
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="twoFactorAuth"
                className="ml-2 font-quicksand text-gray-700"
              >
                Enable two-factor authentication
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    handleInputChange("sessionTimeout", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Min Password Length
                </label>
                <input
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) =>
                    handleInputChange("passwordMinLength", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
              <div>
                <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.loginAttempts}
                  onChange={(e) =>
                    handleInputChange("loginAttempts", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  handleInputChange("emailNotifications", e.target.checked)
                }
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="emailNotifications"
                className="ml-2 font-quicksand text-gray-700"
              >
                Enable email notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                checked={settings.smsNotifications}
                onChange={(e) =>
                  handleInputChange("smsNotifications", e.target.checked)
                }
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="smsNotifications"
                className="ml-2 font-quicksand text-gray-700"
              >
                Enable SMS notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushNotifications"
                checked={settings.pushNotifications}
                onChange={(e) =>
                  handleInputChange("pushNotifications", e.target.checked)
                }
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="pushNotifications"
                className="ml-2 font-quicksand text-gray-700"
              >
                Enable push notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketingEmails"
                checked={settings.marketingEmails}
                onChange={(e) =>
                  handleInputChange("marketingEmails", e.target.checked)
                }
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="marketingEmails"
                className="ml-2 font-quicksand text-gray-700"
              >
                Enable marketing emails
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-jua text-2xl text-primary">System Settings</h1>
            <p className="font-quicksand text-gray-600">
              Configure your Wild Odysseys platform settings
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand"
          >
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-quicksand text-sm font-medium transition-colors flex items-center ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
