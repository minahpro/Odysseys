"use client";

import { useState } from "react";
import Modal from "@/components/admin/Modal";
import { Shield, Eye, Save, Edit } from "lucide-react";

const PrivacyPolicyPage = () => {
  const [policyContent, setPolicyContent] = useState(`# Privacy Policy

## Information We Collect

We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support.

### Personal Information
- Name and contact information
- Payment and billing information
- Travel preferences and requirements
- Communication records

### Automatically Collected Information
- Device and browser information
- IP address and location data
- Website usage and interaction data
- Cookies and similar technologies

## How We Use Your Information

We use the information we collect to:
- Process your bookings and provide our services
- Communicate with you about your trips
- Improve our website and services
- Send you marketing communications (with your consent)
- Comply with legal obligations

## Information Sharing

We may share your information with:
- Service providers and business partners
- Government authorities when required by law
- Other parties with your consent

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate information
- Delete your information
- Object to processing
- Data portability

## Contact Us

If you have any questions about this Privacy Policy, please contact us at privacy@wildodysseys.com.

Last updated: January 15, 2024`);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(policyContent);
  const [lastSaved, setLastSaved] = useState("2024-01-15 10:30 AM");

  const handleSave = () => {
    setPolicyContent(tempContent);
    setIsEditing(false);
    setLastSaved(new Date().toLocaleString());
    alert("Privacy Policy saved successfully!");
  };

  const handleCancel = () => {
    setTempContent(policyContent);
    setIsEditing(false);
  };

  const handlePreview = () => {
    setIsPreviewModalOpen(true);
  };

  const formatPreviewContent = (content) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-jua text-primary mb-4">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-jua text-primary mb-3 mt-6">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-lg font-quicksand font-semibold text-primary mb-2 mt-4"
          >
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        return (
          <li key={index} className="font-quicksand text-gray-700 ml-4">
            {line.substring(2)}
          </li>
        );
      } else if (line.trim() === "") {
        return <br key={index} />;
      } else {
        return (
          <p key={index} className="font-quicksand text-gray-700 mb-2">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-quicksand text-gray-600 text-sm">
                Policy Status
              </p>
              <p className="font-jua text-lg text-primary mt-1">Active</p>
            </div>
            <div className="p-3 rounded-full bg-green-500">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-quicksand text-gray-600 text-sm">
                Last Updated
              </p>
              <p className="font-jua text-lg text-primary mt-1">{lastSaved}</p>
            </div>
            <div className="p-3 rounded-full bg-primary">
              <Edit className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-quicksand text-gray-600 text-sm">Word Count</p>
              <p className="font-jua text-lg text-primary mt-1">
                {policyContent.split(" ").length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-accent">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-jua text-xl text-primary">
            Privacy Policy Editor
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePreview}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-quicksand"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-quicksand"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Policy
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {isEditing ? (
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-2">
                Privacy Policy Content (Markdown supported)
              </label>
              <textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                rows={25}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-vertical"
                placeholder="Enter your privacy policy content here..."
              />
              <p className="font-quicksand text-sm text-gray-500 mt-2">
                Use Markdown formatting: # for headings, ## for subheadings, -
                for bullet points
              </p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <div className="bg-gray-50 p-6 rounded-xl">
                {formatPreviewContent(policyContent)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Privacy Policy Preview"
        size="lg"
      >
        <div className="prose max-w-none">
          <div className="max-h-96 overflow-y-auto">
            {formatPreviewContent(isEditing ? tempContent : policyContent)}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsPreviewModalOpen(false)}
            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand"
          >
            Close Preview
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PrivacyPolicyPage;
