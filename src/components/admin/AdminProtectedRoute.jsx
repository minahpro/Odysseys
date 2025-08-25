"use client";

import { useEffect } from 'react';
import useAdminAuth from '@/lib/hooks/useAdminAuth';
import { PageLoading } from '@/components/Loadings/LoadingComp';
import { Shield, AlertTriangle, Home, LogIn } from 'lucide-react';
import Link from 'next/link';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthorized, isLoading, user, isAdmin } = useAdminAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-quicksand">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message if user is not admin
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-jua">
              Access Denied
            </h1>
            
            <p className="text-gray-600 mb-6 font-quicksand">
              {!user 
                ? "You need to be logged in to access the admin panel."
                : "You don't have administrator privileges to access this area."
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!user ? (
                <Link
                  href="/login"
                  className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand font-medium"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              ) : (
                <Link
                  href="/"
                  className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand font-medium"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              )}
            </div>
            
            {user && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="font-quicksand">
                    Logged in as: {user.email}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // User is authorized, render the protected content
  return children;
};

export default AdminProtectedRoute;