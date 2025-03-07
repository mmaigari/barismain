import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendEmailVerification
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  Timestamp // Add this import
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Type definitions to replace 'any'
interface FirebaseError {
  code: string;
  message: string;
  name?: string;
}

interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  role?: string;
  createdAt?: Date | Timestamp;
  updatedAt?: Date | Timestamp;
  // Add other fields your profiles might have
}

interface ApiResponse<T> {
  success: boolean;
  profile?: T;
  error?: string;
  message?: string;
}

// User registration
export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, { displayName });
    
    // Create user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      displayName,
      createdAt: serverTimestamp(),
      role: "user",
      preferences: {
        emailNotifications: true,
        newsletterSubscribed: true
      }
    });
    
    // Send email verification
    await sendEmailVerification(user);
    
    return { user };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    return { error: firebaseError };
  }
};

// User login
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    return { error: firebaseError };
  }
};

// Google sign in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if this is a new user
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      // Create new user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        role: "user",
        preferences: {
          emailNotifications: true,
          newsletterSubscribed: true
        },
        authProvider: "google"
      });
    }
    
    return { user };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    return { error: firebaseError };
  }
};

// Facebook sign in
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    
    // Check if user exists in database
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      // Create new user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        role: "user",
        preferences: {
          emailNotifications: true,
          newsletterSubscribed: true
        },
        authProvider: "facebook"
      });
    }
    
    return { user };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    return { error: firebaseError };
  }
};

// Sign out
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    return { error: firebaseError };
  }
};

// Password reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    return { error: firebaseError };
  }
};

// Get user profile data
export const getUserProfile = async (userId: string): Promise<ApiResponse<UserProfile>> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserProfile;
      return { 
        success: true, 
        profile: userData
      };
    } else {
      return { 
        success: false,
        error: "User profile not found" 
      };
    }
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error getting user profile:', firebaseError);
    return {
      success: false,
      error: firebaseError.message || 'Failed to retrieve user profile'
    };
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<ApiResponse<null>> => {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...data,
      updatedAt: serverTimestamp()
    });
    
    // If display name is updated, also update in auth
    if (data.displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: data.displayName
      });
    }
    
    return {
      success: true,
      message: 'Profile updated successfully'
    };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error updating user profile:', firebaseError);
    return {
      success: false,
      error: firebaseError.message || 'Failed to update user profile'
    };
  }
};

// Create user profile in Firestore
export const createUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<ApiResponse<null>> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Fix: Remove uid from profileData to avoid duplication
    const { /* uid not needed */ ...restProfileData } = profileData;
    
    // Add timestamps
    const userData = {
      uid: userId,  // Use the userId parameter consistently
      ...restProfileData,  // Spread the rest of profileData without uid
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(userRef, userData);
    
    return {
      success: true,
      message: 'Profile created successfully'
    };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error creating user profile:', firebaseError);
    return {
      success: false,
      error: firebaseError.message || 'Failed to create user profile'
    };
  }
};

// Get user donations
export const getUserDonations = async (userId: string): Promise<ApiResponse<unknown[]>> => {
  try {
    const donationsRef = collection(db, 'donations');
    const q = query(donationsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const donations: unknown[] = [];
    querySnapshot.forEach((doc) => {
      donations.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      profile: donations
    };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error getting user donations:', firebaseError);
    return {
      success: false,
      error: firebaseError.message || 'Failed to retrieve donations'
    };
  }
};

// Get program details
export const getProgram = async (programId: string): Promise<ApiResponse<unknown>> => {
  try {
    const programRef = doc(db, 'programs', programId);
    const programSnap = await getDoc(programRef);
    
    if (programSnap.exists()) {
      return { 
        success: true, 
        profile: { id: programSnap.id, ...programSnap.data() }
      };
    }
    return {
      success: false,
      error: 'Program not found'
    };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error getting program:', firebaseError);
    return {
      success: false,
      error: firebaseError.message || 'Failed to retrieve program'
    };
  }
};

// Get all programs
export const getPrograms = async (): Promise<ApiResponse<unknown[]>> => {
  try {
    const programsRef = collection(db, 'programs');
    const querySnapshot = await getDocs(programsRef);
    
    const programs: Record<string, unknown>[] = [];
    querySnapshot.forEach((doc) => {
      programs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      profile: programs
    };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error getting programs:', firebaseError);
    return {
      success: false,
      error: firebaseError.message || 'Failed to retrieve programs'
    };
  }
};

// Check if email exists
export const checkEmailExists = async (email: string) => {
  try {
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);
    return !querySnapshot.empty;
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error("Error checking email existence:", firebaseError);
    return false;
  }
};

// Export Firebase instances
export { auth, db, storage };