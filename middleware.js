import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    try {
      // Get the session token from cookies
      const sessionCookie = request.cookies.get('session')?.value;
      
      if (!sessionCookie) {
        // No session cookie, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Verify the session token
      const auth = getAuth();
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
      
      if (!decodedClaims) {
        // Invalid session, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Get user data from Firestore to check admin status
      const db = getFirestore();
      const userDoc = await db.collection('users').where('userId', '==', decodedClaims.uid).get();
      
      if (userDoc.empty) {
        // User not found in database, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const userData = userDoc.docs[0].data();
      
      // Check if user is admin
      if (!userData.isAdmin && userData.role !== 'admin') {
        // User is not admin, redirect to home page
        return NextResponse.redirect(new URL('/', request.url));
      }

      // User is admin, allow access
      return NextResponse.next();
      
    } catch (error) {
      console.error('Middleware error:', error);
      // On error, redirect to login for security
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // For non-admin routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};