import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createDocument, getSingleDocByFieldName } from "./databaseOperations";
import firebase from "./firebaseInit";

const { auth } = firebase;

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in database
    const userDoc = await getSingleDocByFieldName("users", [
      { fieldName: "userId", value: user.uid }
    ]);
    
    // If user doesn't exist, create a new user document
    if (!userDoc.didSucceed || userDoc.document === null) {
      const userData = {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: false,
        createdAt: new Date(),
        lastLogin: new Date(),
        authProvider: "google"
      };
      
      await createDocument(userData, "users");
    } else {
      // Update last login
      const { updateDocument } = await import("./databaseOperations");
      await updateDocument("users", userDoc.document.id, {
        lastLogin: new Date()
      });
    }
    
    return {
      didSucceed: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      message: "Successfully signed in with Google"
    };
  } catch (error) {
    console.error("Google sign-in error:", error);
    return {
      didSucceed: false,
      message: getErrorMessage(error.code)
    };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update last login
    const userDoc = await getSingleDocByFieldName("users", [
      { fieldName: "userId", value: user.uid }
    ]);
    
    if (userDoc.didSucceed && userDoc.document) {
      const { updateDocument } = await import("./databaseOperations");
      await updateDocument("users", userDoc.document.id, {
        lastLogin: new Date()
      });
    }
    
    return {
      didSucceed: true,
      user: {
        uid: user.uid,
        email: user.email
      },
      message: "Successfully signed in"
    };
  } catch (error) {
    console.error("Email sign-in error:", error);
    return {
      didSucceed: false,
      message: getErrorMessage(error.code)
    };
  }
};

// Create account with email and password
export const createAccountWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    const userData = {
      userId: user.uid,
      email: user.email,
      displayName: displayName || "",
      isAdmin: false,
      createdAt: new Date(),
      lastLogin: new Date(),
      authProvider: "email"
    };
    
    await createDocument(userData, "users");
    
    return {
      didSucceed: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: displayName
      },
      message: "Account created successfully"
    };
  } catch (error) {
    console.error("Account creation error:", error);
    return {
      didSucceed: false,
      message: getErrorMessage(error.code)
    };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return {
      didSucceed: true,
      message: "Successfully signed out"
    };
  } catch (error) {
    console.error("Sign out error:", error);
    return {
      didSucceed: false,
      message: "Error signing out"
    };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      didSucceed: true,
      message: "Password reset email sent"
    };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      didSucceed: false,
      message: getErrorMessage(error.code)
    };
  }
};

// Helper function to get user-friendly error messages
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "No account found with this email address";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later";
    case "auth/email-already-in-use":
      return "An account with this email already exists";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed";
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled";
    default:
      return "An error occurred. Please try again";
  }
};