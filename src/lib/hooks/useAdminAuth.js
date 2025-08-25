"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

const useAdminAuth = () => {
  const { authUser, isFetchingAuthUser } = useAppContext();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth user to be fetched
    if (!isFetchingAuthUser) {
      // Check if user is authenticated
      if (!authUser) {
        // User is not authenticated, redirect to login
        router.push('/login');
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      // Check if user has admin privileges
      const hasAdminAccess = authUser.isAdmin === true || authUser.role === 'admin';
      
      if (!hasAdminAccess) {
        // User is authenticated but not admin, redirect to home
        router.push('/');
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      // User is authenticated and has admin access
      setIsAuthorized(true);
      setIsLoading(false);
    }
  }, [authUser, isFetchingAuthUser, router]);

  return {
    isAuthorized,
    isLoading,
    user: authUser,
    isAdmin: authUser?.isAdmin === true || authUser?.role === 'admin'
  };
};

export default useAdminAuth;