import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendEmailVerification,
  User
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
  getDocs
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Add this import

// Your Firebase configuration
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
const storage = getStorage(app); // Add this export

// Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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
  } catch (error: any) {
    return { error };
  }
};

// User login
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error: any) {
    return { error };
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
  } catch (error: any) {
    return { error };
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
  } catch (error: any) {
    return { error };
  }
};

// Sign out
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { error };
  }
};

// Password reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { error };
  }
};

// Get user profile data
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { profile: userDoc.data() };
    } else {
      return { error: "User profile not found" };
    }
  } catch (error: any) {
    return { error };
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, data: any) => {
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
    
    return { success: true };
  } catch (error: any) {
    return { error };
  }
};

// Check if email exists
export const checkEmailExists = async (email: string) => {
  try {
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
};

// Export Firebase instances
export { auth, db, storage };