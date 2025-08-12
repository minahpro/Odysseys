"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  Calendar,
  User,
  Users,
  Target,
  Send,
} from "lucide-react";

const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      email: "john.doe@email.com",
      name: "John Doe",
      subscribedDate: "2024-01-15",
      status: "active",
      source: "website",
    },
    {
      id: 2,
      email: "jane.smith@email.com",
      name: "Jane Smith",
      subscribedDate: "2024-01-20",
      status: "active",
      source: "newsletter",
    },
    {
      id: 3,
      email: "mike.johnson@email.com",
      name: "Mike Johnson",
      subscribedDate: "2024-02-01",
      status: "unsubscribed",
      source: "social_media",
    },
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Safari Special",
      subject: "🦁 50% Off Summer Safari Adventures!",
      status: "sent",
      sentDate: "2024-01-10",
      recipients: 1250,
      openRate: 24.5,
      clickRate: 3.2,
    },
    {
      id: 2,
      name: "Kilimanjaro Season",
      subject: "🏔️ Best Time to Climb Kilimanjaro",
      status: "draft",
      sentDate: null,
      recipients: 0,
      openRate: 0,
      clickRate: 0,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    status: "active",
    source: "website",
  });

  const [activeTab, setActiveTab] = useState("subscribers");

  const subscriberColumns = [
    {
      key: "email",
      label: "Email",
      render: (subscriber) => (
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{subscriber.email}</span>
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (subscriber) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span>{subscriber.name}</span>
        </div>
      ),
    },
    {
      key: "subscribedDate",
      label: "Subscribed Date",
      render: (subscriber) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{subscriber.subscribedDate}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (subscriber) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            subscriber.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {subscriber.status}
        </span>
      ),
    },
    {
      key: "source",
      label: "Source",
      render: (subscriber) => (
        <span className="text-sm text-gray-600 capitalize">
          {subscriber.source.replace("_", " ")}
        </span>
      ),
    },
  ];

  const campaignColumns = [
    {
      key: "name",
      label: "Campaign Name",
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: "subject",
      label: "Subject",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-quicksand ${
            value === "sent"
              ? "bg-green-100 text-green-800"
              : value === "draft"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "recipients",
      label: "Recipients",
      render: (value) => (
        <span className="font-jua text-primary">{value.toLocaleString()}</span>
      ),
    },
    {
      key: "openRate",
      label: "Open Rate",
      render: (value) => <span className="font-semibold">{value}%</span>,
    },
    {
      key: "clickRate",
      label: "Click Rate",
      render: (value) => <span className="font-semibold">{value}%</span>,
    },
  ];

  const handleAddSubscriber = () => {
    setFormData({ email: "", name: "", status: "active", source: "website" });
    setShowAddModal(true);
  };

  const handleEditSubscriber = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setFormData(subscriber);
    setShowEditModal(true);
  };

  const handleViewSubscriber = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowViewModal(true);
  };

  const handleDeleteSubscriber = (subscriber) => {
    if (confirm("Are you sure you want to delete this subscriber?")) {
      console.log("Delete subscriber:", subscriber.id);
    }
  };

  const handleSubmitSubscriber = (e) => {
    e.preventDefault();
    if (selectedSubscriber) {
      // Edit existing subscriber
      setSubscribers(
        subscribers.map((s) =>
          s.id === selectedSubscriber.id ? { ...s, ...formData } : s
        )
      );
      setShowEditModal(false);
    } else {
      // Add new subscriber
      const newSubscriber = {
        id: subscribers.length + 1,
        ...formData,
        subscribedDate: new Date().toISOString().split("T")[0],
      };
      setSubscribers([...subscribers, newSubscriber]);
      setShowAddModal(false);
    }
  };

  const handleCreateCampaign = () => {
    // Logic for creating a campaign
  };

  const handleSubmitCampaign = (e) => {
    e.preventDefault();
    const newCampaign = {
      id: campaigns.length + 1,
      name: "",
      subject: "",
      content: "",
      targetAudience: "all",
      status: "draft",
      sentDate: null,
      recipients: 0,
      openRate: 0,
      clickRate: 0,
    };
    setCampaigns([...campaigns, newCampaign]);
    // Logic for closing the modal
  };

  const handleSendCampaign = (campaign) => {
    if (
      confirm("Are you sure you want to send this campaign to all subscribers?")
    ) {
      const activeSubscribers = subscribers.filter(
        (s) => s.status === "active"
      ).length;
      setCampaigns(
        campaigns.map((c) =>
          c.id === campaign.id
            ? {
                ...c,
                status: "sent",
                sentDate: new Date().toISOString().split("T")[0],
                recipients: activeSubscribers,
              }
            : c
        )
      );
    }
  };

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleViewSubscriber,
      className: "text-blue-600 hover:text-blue-800",
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: handleEditSubscriber,
      className: "text-green-600 hover:text-green-800",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: handleDeleteSubscriber,
      className: "text-red-600 hover:text-red-800",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-quicksand text-gray-600 text-sm">
                Total Subscribers
              </p>
              <p className="font-jua text-2xl text-primary">
                {subscribers.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-quicksand text-gray-600 text-sm">
                Active Subscribers
              </p>
              <p className="font-jua text-2xl text-primary">
                {subscribers.filter((s) => s.status === "active").length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-500">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-quicksand text-gray-600 text-sm">
                Campaigns Sent
              </p>
              <p className="font-jua text-2xl text-primary">
                {campaigns.filter((c) => c.status === "sent").length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-500">
              <Send className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-quicksand text-gray-600 text-sm">
                Avg. Open Rate
              </p>
              <p className="font-jua text-2xl text-primary">
                {campaigns.filter((c) => c.status === "sent").length > 0
                  ? (
                      campaigns
                        .filter((c) => c.status === "sent")
                        .reduce((acc, c) => acc + c.openRate, 0) /
                      campaigns.filter((c) => c.status === "sent").length
                    ).toFixed(1)
                  : 0}
                %
              </p>
            </div>
            <div className="p-3 rounded-full bg-orange-500">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`py-4 px-2 border-b-2 font-quicksand font-medium text-sm ${
                activeTab === "subscribers"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Subscribers
            </button>
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`py-4 px-2 border-b-2 font-quicksand font-medium text-sm ${
                activeTab === "campaigns"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Campaigns
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "subscribers" ? (
            <DataTable
              title=""
              data={subscribers}
              columns={subscriberColumns}
              onAdd={handleAddSubscriber}
              onEdit={handleEditSubscriber}
              onDelete={handleDeleteSubscriber}
              searchable={true}
              actions={actions}
            />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-jua text-xl text-primary">
                  Email Campaigns
                </h3>
                <button
                  onClick={handleCreateCampaign}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="font-quicksand">Create Campaign</span>
                </button>
              </div>

              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-jua text-lg text-primary">
                          {campaign.name}
                        </h4>
                        <p className="font-quicksand text-gray-600 mb-2">
                          {campaign.subject}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-quicksand ${
                              campaign.status === "sent"
                                ? "bg-green-100 text-green-800"
                                : campaign.status === "draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {campaign.status}
                          </span>
                          {campaign.sentDate && (
                            <span>
                              Sent:{" "}
                              {new Date(campaign.sentDate).toLocaleDateString()}
                            </span>
                          )}
                          <span>
                            Recipients: {campaign.recipients.toLocaleString()}
                          </span>
                          {campaign.status === "sent" && (
                            <>
                              <span>Open Rate: {campaign.openRate}%</span>
                              <span>Click Rate: {campaign.clickRate}%</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {campaign.status === "draft" && (
                          <button
                            onClick={() => handleSendCampaign(campaign)}
                            className="px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-quicksand"
                          >
                            Send Now
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-quicksand">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subscriber Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Subscriber"
        size="md"
      >
        <form onSubmit={handleSubmitSubscriber} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
              >
                <option value="active">Active</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Source
              </label>
              <select
                value={formData.source}
                onChange={(e) =>
                  setFormData({ ...formData, source: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
              >
                <option value="website">Website</option>
                <option value="newsletter">Newsletter</option>
                <option value="social_media">Social Media</option>
                <option value="referral">Referral</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/80 hover:to-primary transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
            >
              Add Subscriber
            </button>
          </div>
        </form>
      </Modal>

      {/* Subscriber Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Subscriber"
        size="md"
      >
        <form onSubmit={handleSubmitSubscriber} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
              >
                <option value="active">Active</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Source
              </label>
              <select
                value={formData.source}
                onChange={(e) =>
                  setFormData({ ...formData, source: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
              >
                <option value="website">Website</option>
                <option value="newsletter">Newsletter</option>
                <option value="social_media">Social Media</option>
                <option value="referral">Referral</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/80 hover:to-primary transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
            >
              Update Subscriber
            </button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      {showViewModal && selectedSubscriber && (
        <Modal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          title="Subscriber Details"
        >
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white -m-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-jua">
                    {selectedSubscriber.name}
                  </h3>
                  <p className="text-white/80 font-quicksand">
                    {selectedSubscriber.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 font-jua mb-3">
                  Subscription Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Subscribed Date:
                    </p>
                    <p className="font-medium text-gray-900">
                      {selectedSubscriber.subscribedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Status:
                    </p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        selectedSubscriber.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedSubscriber.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Source:
                    </p>
                    <p className="font-medium text-gray-900 capitalize">
                      {selectedSubscriber.source.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SubscribersPage;
