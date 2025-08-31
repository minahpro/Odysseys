import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { runTransaction, doc } from "firebase/firestore";
import { createDocument, getSingleDocByFieldName } from "./databaseOperations";
import firebase from "./firebaseInit";

const { auth, db } = firebase;

// Helper function to check if email already exists
const checkEmailExists = async (email) => {
  try {
    const userDoc = await getSingleDocByFieldName("users", [
      { fieldName: "email", value: email }
    ]);
    return userDoc.didSucceed && userDoc.document !== null;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
};

// Unified user creation function with transaction
const createUserWithTransaction = async (userData) => {
  try {
    return await runTransaction(db, async (transaction) => {
      // Check if email already exists within transaction
      const emailExists = await checkEmailExists(userData.email);
      if (emailExists) {
        throw new Error("auth/email-already-in-use");
      }
      
      // Check if userId already exists within transaction
      const userDoc = await getSingleDocByFieldName("users", [
        { fieldName: "userId", value: userData.userId }
      ]);
      
      if (userDoc.didSucceed && userDoc.document !== null) {
        // User already exists, return existing user
        return { didSucceed: true, isExisting: true, user: userDoc.document };
      }
      
      // Create new user document
      const result = await createDocument(userData, "users");
      return { didSucceed: result.didSucceed, isExisting: false, docId: result.docId };
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    if (error.message === "auth/email-already-in-use") {
      return { didSucceed: false, message: "An account with this email already exists" };
    }
    return { didSucceed: false, message: "Failed to create user account" };
  }
};

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
    
    // If user doesn't exist, create a new user document using transaction
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
      
      const createResult = await createUserWithTransaction(userData);
      if (!createResult.didSucceed) {
        return {
          didSucceed: false,
          message: createResult.message
        };
      }
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
    // Check if email already exists before creating Firebase auth account
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return {
        didSucceed: false,
        message: "An account with this email already exists"
      };
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore using transaction
    const userData = {
      userId: user.uid,
      email: user.email,
      displayName: displayName || "",
      isAdmin: false,
      createdAt: new Date(),
      lastLogin: new Date(),
      authProvider: "email"
    };
    
    const createResult = await createUserWithTransaction(userData);
    if (!createResult.didSucceed) {
      // If Firestore creation fails, we should delete the Firebase auth user
      // Note: This is a cleanup operation
      try {
        await user.delete();
      } catch (deleteError) {
        console.error("Failed to cleanup Firebase auth user:", deleteError);
      }
      return {
        didSucceed: false,
        message: createResult.message
      };
    }
    
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