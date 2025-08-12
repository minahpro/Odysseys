"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import {
  Trash2,
  Eye,
  Mail,
  User,
  Calendar,
  Flag,
  Reply,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const MessagesPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      subject: "Inquiry about Serengeti Safari",
      message:
        "Hi, I'm interested in booking a 7-day Serengeti safari for my family of 4. Could you please provide more details about the itinerary and pricing?",
      priority: "high",
      status: "unread",
      createdAt: "2024-01-20T10:30:00Z",
      repliedAt: null,
      reply: "",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      subject: "Kilimanjaro Trekking Question",
      message:
        "I'm planning to climb Kilimanjaro next year. What's the best route for beginners and what should I expect in terms of difficulty?",
      priority: "medium",
      status: "read",
      createdAt: "2024-01-19T14:15:00Z",
      repliedAt: null,
      reply: "",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      subject: "Thank you for amazing trip!",
      message:
        "Just wanted to say thank you for organizing such an incredible safari experience. Everything was perfect and our guide was fantastic!",
      priority: "low",
      status: "replied",
      createdAt: "2024-01-18T09:45:00Z",
      repliedAt: "2024-01-18T16:20:00Z",
      reply:
        "Thank you so much for your kind words! We're thrilled that you had such a wonderful experience. We'd love to help you plan your next adventure!",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  const priorities = [
    {
      value: "low",
      label: "Low",
      color: "bg-gray-100 text-gray-800",
      icon: Clock,
    },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800",
      icon: AlertCircle,
    },
    {
      value: "high",
      label: "High",
      color: "bg-red-100 text-red-800",
      icon: Flag,
    },
  ];

  const statuses = [
    {
      value: "unread",
      label: "Unread",
      color: "bg-blue-100 text-blue-800",
      icon: Mail,
    },
    {
      value: "read",
      label: "Read",
      color: "bg-gray-100 text-gray-800",
      icon: Eye,
    },
    {
      value: "replied",
      label: "Replied",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
  ];

  const getPriorityInfo = (priority) => {
    return priorities.find((p) => p.value === priority) || priorities[0];
  };

  const getStatusInfo = (status) => {
    return statuses.find((s) => s.value === status) || statuses[0];
  };

  const columns = [
    {
      key: "message",
      label: "Message",
      render: (msg) => (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 font-quicksand">
              {msg.name}
            </div>
            <div className="text-sm text-gray-500 font-quicksand truncate">
              {msg.email}
            </div>
            <div className="text-sm font-medium text-gray-800 font-quicksand mt-1 truncate">
              {msg.subject}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "details",
      label: "Details",
      render: (msg) => {
        const priorityInfo = getPriorityInfo(msg.priority);
        const statusInfo = getStatusInfo(msg.status);
        const PriorityIcon = priorityInfo.icon;
        const StatusIcon = statusInfo.icon;

        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <PriorityIcon className="w-4 h-4" />
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}
              >
                {priorityInfo.label}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <StatusIcon className="w-4 h-4" />
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: "date",
      label: "Date",
      render: (msg) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="text-xs text-gray-500">
            {new Date(msg.createdAt).toLocaleTimeString()}
          </div>
          {msg.repliedAt && (
            <div className="text-xs text-green-600">
              Replied {new Date(msg.repliedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleView = (msg) => {
    setModalMode("view");
    setSelectedMessage(msg);
    setReplyText(msg.reply || "");

    // Mark as read if unread
    if (msg.status === "unread") {
      setMessages(
        messages.map((m) => (m.id === msg.id ? { ...m, status: "read" } : m))
      );
    }

    setShowModal(true);
  };

  const handleReply = (msg) => {
    setModalMode("reply");
    setSelectedMessage(msg);
    setReplyText("");
    setShowModal(true);
  };

  const handleDelete = (msg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the message from "${msg.name}"?`
      )
    ) {
      setMessages(messages.filter((m) => m.id !== msg.id));
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();

    if (replyText.trim()) {
      setMessages(
        messages.map((m) =>
          m.id === selectedMessage.id
            ? {
                ...m,
                status: "replied",
                reply: replyText,
                repliedAt: new Date().toISOString(),
              }
            : m
        )
      );
      setShowModal(false);
      setReplyText("");
    }
  };

  const handlePriorityChange = (messageId, newPriority) => {
    setMessages(
      messages.map((m) =>
        m.id === messageId ? { ...m, priority: newPriority } : m
      )
    );
  };

  const handleStatusChange = (messageId, newStatus) => {
    setMessages(
      messages.map((m) =>
        m.id === messageId ? { ...m, status: newStatus } : m
      )
    );
  };

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleView,
      className: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
    },
    {
      label: "Reply",
      icon: Reply,
      onClick: handleReply,
      className: "text-green-600 hover:text-green-800 hover:bg-green-50",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: handleDelete,
      className: "text-red-600 hover:text-red-800 hover:bg-red-50",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-jua">
              Messages
            </h1>
            <p className="text-gray-600 font-quicksand">
              Manage customer inquiries and communications
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>
                {messages.filter((m) => m.status === "unread").length} Unread
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>
                {messages.filter((m) => m.priority === "high").length} High
                Priority
              </span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DataTable
            data={messages}
            columns={columns}
            actions={actions}
            searchable={true}
            exportable={true}
          />
        </div>

        {/* Modal */}
        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={
              modalMode === "view" ? "Message Details" : "Reply to Message"
            }
            size="lg"
          >
            {modalMode === "view" ? (
              <div className="space-y-6">
                {/* View Mode Content */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 font-jua">
                          {selectedMessage?.name}
                        </h3>
                        <p className="text-gray-600 font-quicksand">
                          {selectedMessage?.email}
                        </p>
                        <p className="text-sm text-gray-500 font-quicksand mt-1">
                          {selectedMessage?.createdAt &&
                            new Date(
                              selectedMessage.createdAt
                            ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedMessage?.priority}
                        onChange={(e) =>
                          handlePriorityChange(
                            selectedMessage.id,
                            e.target.value
                          )
                        }
                        className="px-3 py-1 border border-gray-300 rounded-xl text-sm font-quicksand"
                      >
                        {priorities.map((priority) => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedMessage?.status}
                        onChange={(e) =>
                          handleStatusChange(selectedMessage.id, e.target.value)
                        }
                        className="px-3 py-1 border border-gray-300 rounded-xl text-sm font-quicksand"
                      >
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 font-jua mb-3">
                    Subject
                  </h4>
                  <p className="text-gray-800 font-quicksand text-lg">
                    {selectedMessage?.subject}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 font-jua mb-3">
                    Message
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700 font-quicksand leading-relaxed whitespace-pre-wrap">
                      {selectedMessage?.message}
                    </p>
                  </div>
                </div>

                {selectedMessage?.reply && (
                  <div>
                    <h4 className="font-semibold text-gray-900 font-jua mb-3">
                      Your Reply
                    </h4>
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-gray-700 font-quicksand leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.reply}
                      </p>
                      <div className="text-sm text-gray-500 font-quicksand mt-2">
                        Sent{" "}
                        {selectedMessage.repliedAt &&
                          new Date(selectedMessage.repliedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setModalMode("reply");
                      setReplyText(selectedMessage?.reply || "");
                    }}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    {selectedMessage?.reply ? "Update Reply" : "Reply"}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendReply} className="space-y-6">
                {/* Reply Mode Content */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 font-jua mb-2">
                    Original Message
                  </h4>
                  <div className="text-sm text-gray-600 font-quicksand">
                    <strong>From:</strong> {selectedMessage?.name} (
                    {selectedMessage?.email})
                  </div>
                  <div className="text-sm text-gray-600 font-quicksand">
                    <strong>Subject:</strong> {selectedMessage?.subject}
                  </div>
                  <div className="mt-3 p-3 bg-white rounded border text-gray-700 font-quicksand text-sm">
                    {selectedMessage?.message}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Your Reply *
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-none"
                    placeholder="Type your reply here..."
                    required
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-blue-900 font-quicksand">
                        Email Preview
                      </h5>
                      <p className="text-sm text-blue-700 font-quicksand mt-1">
                        This reply will be sent to {selectedMessage?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </button>
                </div>
              </form>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
