"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = "/admin";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logos/white2.png"
            alt="Wild Odysseys"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="font-jua text-3xl text-white mb-2">Admin Panel</h1>
          <p className="font-quicksand text-highlight">
            Sign in to manage Wild Odysseys
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                placeholder="admin@wildodysseys.com"
                required
              />
            </div>

            <div>
              <label className="block font-quicksand font-semibold text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 font-quicksand text-sm text-gray-600">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="font-quicksand text-sm text-accent hover:text-primary"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary/90 transition-colors font-quicksand font-semibold flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-quicksand text-sm text-gray-600">
              Need help? Contact{" "}
              <a
                href="mailto:support@wildodysseys.com"
                className="text-accent hover:text-primary"
              >
                support@wildodysseys.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="font-quicksand text-sm text-highlight">
            © 2024 Wild Odysseys Tanzania. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
