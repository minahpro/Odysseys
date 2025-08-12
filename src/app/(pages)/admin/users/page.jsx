"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Save,
  Upload,
} from "lucide-react";

const UsersPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      role: "admin",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "2024-01-15",
      lastLogin: "2024-01-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 234 567 8901",
      role: "manager",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "2024-01-16",
      lastLogin: "2024-01-19",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 234 567 8902",
      role: "user",
      status: "inactive",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "2024-01-17",
      lastLogin: "2024-01-18",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    status: "active",
    avatar: "",
  });

  const roles = [
    {
      value: "admin",
      label: "Administrator",
      color: "bg-red-100 text-red-800",
    },
    { value: "manager", label: "Manager", color: "bg-blue-100 text-blue-800" },
    { value: "user", label: "User", color: "bg-green-100 text-green-800" },
  ];

  const getRoleColor = (role) => {
    const roleObj = roles.find((r) => r.value === role);
    return roleObj ? roleObj.color : "bg-gray-100 text-gray-800";
  };

  const getRoleLabel = (role) => {
    const roleObj = roles.find((r) => r.value === role);
    return roleObj ? roleObj.label : role;
  };

  const columns = [
    {
      key: "user",
      label: "User",
      render: (user) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
            <img
              src={user.avatar || "/placeholder.svg?height=40&width=40"}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900 font-quicksand">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {user.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact",
      render: (user) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-1" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
        >
          {getRoleLabel(user.role)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setModalMode("add");
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "user",
      status: "active",
      avatar: "",
    });
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "user",
      status: user.status || "active",
      avatar: user.avatar || "",
    });
    setShowModal(true);
  };

  const handleView = (user) => {
    setModalMode("view");
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      const newUser = {
        ...formData,
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        joinedAt: new Date().toISOString().split("T")[0],
        lastLogin: null,
      };
      setUsers([...users, newUser]);
    } else if (modalMode === "edit") {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...selectedUser, ...formData } : u
        )
      );
    }

    setShowModal(false);
  };

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleView,
      className: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: handleEdit,
      className: "text-amber-600 hover:text-amber-800 hover:bg-amber-50",
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
            <h1 className="text-2xl font-bold text-gray-900 font-jua">Users</h1>
            <p className="text-gray-600 font-quicksand">
              Manage user accounts and permissions
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DataTable
            data={users}
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
              modalMode === "view"
                ? "User Details"
                : modalMode === "add"
                  ? "Add New User"
                  : "Edit User"
            }
            size="lg"
          >
            {modalMode === "view" ? (
              <div className="space-y-6">
                {/* View Mode Content */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={
                          selectedUser?.avatar ||
                          "/placeholder.svg?height=64&width=64"
                        }
                        alt={selectedUser?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-jua">
                        {selectedUser?.name}
                      </h3>
                      <p className="text-gray-600 font-quicksand">
                        {selectedUser?.email}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser?.role)}`}
                        >
                          {getRoleLabel(selectedUser?.role)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedUser?.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedUser?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 font-quicksand mb-2">
                        Contact Information
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <Mail className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-quicksand">
                            {selectedUser?.email}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Phone className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-quicksand">
                            {selectedUser?.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 font-quicksand mb-2">
                        Account Details
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-quicksand">
                            Joined{" "}
                            {selectedUser?.joinedAt &&
                              new Date(
                                selectedUser.joinedAt
                              ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Shield className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-quicksand">
                            Role: {getRoleLabel(selectedUser?.role)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 font-quicksand mb-2">
                        Activity
                      </h4>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 font-quicksand">
                          Last Login:{" "}
                          {selectedUser?.lastLogin
                            ? new Date(
                                selectedUser.lastLogin
                              ).toLocaleDateString()
                            : "Never"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 font-quicksand mb-2">
                        Permissions
                      </h4>
                      <div className="space-y-2">
                        {selectedUser?.role === "admin" && (
                          <div className="flex items-center text-green-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            <span className="text-sm font-quicksand">
                              Full system access
                            </span>
                          </div>
                        )}
                        {selectedUser?.role === "manager" && (
                          <>
                            <div className="flex items-center text-blue-700">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              <span className="text-sm font-quicksand">
                                Manage tours and bookings
                              </span>
                            </div>
                            <div className="flex items-center text-blue-700">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              <span className="text-sm font-quicksand">
                                View reports
                              </span>
                            </div>
                          </>
                        )}
                        {selectedUser?.role === "user" && (
                          <div className="flex items-center text-gray-700">
                            <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                            <span className="text-sm font-quicksand">
                              Basic access
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Mode Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                      required
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {formData.avatar ? (
                        <img
                          src={formData.avatar || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="url"
                        value={formData.avatar}
                        onChange={(e) =>
                          setFormData({ ...formData, avatar: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                        placeholder="Enter image URL or upload"
                      />
                      <button
                        type="button"
                        className="mt-2 flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand text-sm"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Upload Image
                      </button>
                    </div>
                  </div>
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
                    <option value="inactive">Inactive</option>
                  </select>
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
                    <Save className="w-4 h-4 mr-2" />
                    {modalMode === "add" ? "Create User" : "Update User"}
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

export default UsersPage;
