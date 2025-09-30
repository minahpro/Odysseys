"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { FormTextEditor } from "@/components/FormTextEditor";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from "@/firebase/databaseOperations";
import {
  Edit,
  Trash,
  Eye,
  Plus,
  HelpCircle,
  MessageCircle,
  Tag,
  Check,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";

const FAQsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // view, add, edit
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success, error

  // Load FAQs from Firebase
  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    setLoading(true);
    try {
      const result = await getFAQs();
      if (result.didSucceed) {
        setFaqs(result.items);
      } else {
        setMessage("Failed to load FAQs");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error loading FAQs:", error);
      setMessage("Error loading FAQs");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  // FAQ categories
  const categories = [
    "Safari",
    "Travel Requirements",
    "Health & Safety",
    "Trekking",
    "Accommodation",
    "General",
  ];

  // Status options
  const statusOptions = [
    { value: "active", label: "Active", icon: Check, color: "text-green-600" },
    {
      value: "draft",
      label: "Draft",
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    { value: "inactive", label: "Inactive", icon: X, color: "text-red-600" },
  ];

  const getStatusIcon = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    if (!option) return null;
    const Icon = option.icon;
    return <Icon className={`w-4 h-4 ${option.color}`} />;
  };

  const columns = [
    {
      key: "question",
      label: "Question",
      render: (faq) => (
        <div className="max-w-md">
          <div className="font-medium text-gray-900 font-quicksand line-clamp-2">
            {faq.question}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Category: {faq.category}
          </div>
        </div>
      ),
    },
    {
      key: "answer",
      label: "Answer",
      render: (faq) => (
        <div className="max-w-md">
          <div className="text-sm text-gray-600 font-quicksand line-clamp-3">
            {faq.answer}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (faq) => (
        <div className="flex items-center space-x-1">
          {getStatusIcon(faq.status)}
          <span className="text-sm font-medium capitalize">{faq.status}</span>
        </div>
      ),
    },
    {
      key: "order",
      label: "Order",
      render: (faq) => (
        <div className="text-center font-medium">{faq.order}</div>
      ),
    },
  ];

  const handleAdd = () => {
    setModalMode("add");
    setSelectedFAQ({
      question: "",
      answer: "",
      category: categories[0],
      status: "draft",
      order: faqs.length + 1,
    });
    setShowModal(true);
  };

  const handleEdit = (faq) => {
    setModalMode("edit");
    setSelectedFAQ({ ...faq });
    setShowModal(true);
  };

  const handleView = (faq) => {
    setModalMode("view");
    setSelectedFAQ(faq);
    setShowModal(true);
  };

  const handleDelete = async (faq) => {
    if (
      window.confirm(
        `Are you sure you want to delete the FAQ: "${faq.question}"?`
      )
    ) {
      try {
        const result = await deleteFAQ(faq.id);
        if (result.didSucceed) {
          setFaqs(faqs.filter(f => f.id !== faq.id));
          showMessage(result.message, "success");
        } else {
          showMessage(result.message, "error");
        }
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        showMessage("Failed to delete FAQ", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (modalMode === "add") {
        const result = await createFAQ(selectedFAQ);
        if (result.didSucceed) {
          setFaqs([...faqs, result.createdItem]);
          showMessage(result.message, "success");
          setShowModal(false);
        } else {
          showMessage(result.message, "error");
        }
      } else if (modalMode === "edit") {
        const result = await updateFAQ(selectedFAQ.id, selectedFAQ);
        if (result.didSucceed) {
          setFaqs(faqs.map(f => f.id === selectedFAQ.id ? selectedFAQ : f));
          showMessage(result.message, "success");
          setShowModal(false);
        } else {
          showMessage(result.message, "error");
        }
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      showMessage("Failed to save FAQ", "error");
    } finally {
      setSaving(false);
    }
  };

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleView,
      className: "text-blue-600 hover:text-blue-800",
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: handleEdit,
      className: "text-amber-600 hover:text-amber-800",
    },
    {
      label: "Delete",
      icon: Trash,
      onClick: handleDelete,
      className: "text-red-600 hover:text-red-800",
    },
  ];

  return (
      <div className="w-full max-w-full overflow-hidden">
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-blue-50">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 font-jua">
                {faqs.length}
              </h3>
              <p className="text-sm text-gray-600 font-quicksand mt-1">
                Total FAQs
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-50">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 font-jua">
                {faqs.filter((faq) => faq.status === "active").length}
              </h3>
              <p className="text-sm text-gray-600 font-quicksand mt-1">
                Active FAQs
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-50">
                <Tag className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 font-jua">
                {categories.length}
              </h3>
              <p className="text-sm text-gray-600 font-quicksand mt-1">
                FAQ Categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-xl border ${
          messageType === "success" 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <div className="flex items-center">
            {messageType === "success" ? (
              <Check className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            <span className="font-quicksand">{message}</span>
          </div>
        </div>
      )}

      {/* FAQ Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-jua">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 font-quicksand mt-1">
                Manage your website's FAQ section
              </p>
            </div>
            <button
              onClick={handleAdd}
              disabled={loading || saving}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              <span className="font-quicksand">
                {loading ? "Loading..." : saving ? "Saving..." : "Add New FAQ"}
              </span>
            </button>
          </div>
        </div>
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600 font-quicksand">Loading FAQs...</p>
          </div>
        ) : (
          <DataTable data={faqs} columns={columns} actions={actions} />
        )}
      </div>

      {/* Modal for View/Add/Edit */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={
            modalMode === "view"
              ? "FAQ Details"
              : modalMode === "add"
                ? "Add New FAQ"
                : "Edit FAQ"
          }
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Question */}
              <div>
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Question
                </label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="question"
                    value={selectedFAQ.question}
                    onChange={(e) =>
                      setSelectedFAQ({
                        ...selectedFAQ,
                        question: e.target.value,
                      })
                    }
                    className="pl-10 w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter FAQ question"
                    disabled={modalMode === "view"}
                    required
                  />
                </div>
              </div>

              {/* Answer */}
              <FormTextEditor
                label="Answer"
                value={selectedFAQ.answer}
                onChange={(content) =>
                  setSelectedFAQ({ ...selectedFAQ, answer: content })
                }
                placeholder="Enter FAQ answer"
                minHeight="150px"
                disabled={modalMode === "view"}
                required
              />

              {/* Category and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <select
                      id="category"
                      value={selectedFAQ.category}
                      onChange={(e) =>
                        setSelectedFAQ({
                          ...selectedFAQ,
                          category: e.target.value,
                        })
                      }
                      className="pl-10 w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                      disabled={modalMode === "view"}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <AlertCircle className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <select
                      id="status"
                      value={selectedFAQ.status}
                      onChange={(e) =>
                        setSelectedFAQ({
                          ...selectedFAQ,
                          status: e.target.value,
                        })
                      }
                      className="pl-10 w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                      disabled={modalMode === "view"}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Order */}
              <div>
                <label
                  htmlFor="order"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Display Order
                </label>
                <input
                  type="number"
                  id="order"
                  value={selectedFAQ.order}
                  onChange={(e) =>
                    setSelectedFAQ({
                      ...selectedFAQ,
                      order: Number.parseInt(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  min="1"
                  disabled={modalMode === "view"}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              {modalMode !== "view" && (
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {saving && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {saving 
                    ? "Saving..." 
                    : modalMode === "add" 
                      ? "Add FAQ" 
                      : "Update FAQ"
                  }
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={saving}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {modalMode === "view" ? "Close" : "Cancel"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
    </div>
  );
};

export default FAQsPage;
