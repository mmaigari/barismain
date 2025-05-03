// Application management service
// This service handles storing, retrieving, and updating volunteer applications

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp 
} from 'firebase/firestore';

// Types for application data
interface ApplicationInterests {
  communityOutreach: boolean;
  educationalSupport: boolean;
  fundraising: boolean;
  administrativeSupport: boolean;
  globalProjects: boolean;
  partnershipDevelopment: boolean;
}

export interface ApplicationData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  educationLevel: string;
  availableHours: string;
  interests: ApplicationInterests;
  experience: string;
  declaration: boolean;
  signature: string;
  submittedAt?: Date;
  status: 'pending' | 'under-review' | 'accepted' | 'rejected';
  adminNotes?: string;
  assignedPosition?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Your Firebase configuration
  // Get this from your firebase.json or Firebase console
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase (with lazy loading for SSR compatibility)
let app;
let db;

function getFirebase() {
  if (!app) {
    try {
      app = initializeApp(firebaseConfig);
      db = getFirestore(app);
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  }
  return { app, db };
}

/**
 * Save a new volunteer application to the database
 * @param application The application data to save
 * @returns The ID of the newly created application
 */
export async function saveApplication(application: ApplicationData): Promise<string> {
  try {
    const { db } = getFirebase();
    
    // Convert Date to Firestore Timestamp
    const appData = {
      ...application,
      submittedAt: Timestamp.fromDate(application.submittedAt || new Date()),
    };
    
    // Add to applications collection
    const docRef = await addDoc(collection(db, 'applications'), appData);
    
    // Send notification email if needed
    await sendApplicationNotification(application);
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving application:', error);
    throw new Error('Failed to save application');
  }
}

/**
 * Get a specific application by ID
 * @param id The application ID
 * @returns The application data or null if not found
 */
export async function getApplicationById(id: string): Promise<ApplicationData | null> {
  try {
    const { db } = getFirebase();
    
    const docRef = doc(db, 'applications', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        // Convert Timestamp back to Date
        submittedAt: data.submittedAt?.toDate(),
        reviewedAt: data.reviewedAt?.toDate(),
      } as ApplicationData;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting application:', error);
    throw new Error('Failed to retrieve application');
  }
}

/**
 * Get all applications with optional filtering
 * @param filters Optional filter conditions
 * @returns Array of application data
 */
export async function getApplications(filters?: {
  status?: 'pending' | 'under-review' | 'accepted' | 'rejected';
  email?: string;
  limit?: number;
}): Promise<ApplicationData[]> {
  try {
    const { db } = getFirebase();
    
    let q = collection(db, 'applications');
    
    // Apply filters if provided
    if (filters) {
      const constraints = [];
      
      if (filters.status) {
        constraints.push(where('status', '==', filters.status));
      }
      
      if (filters.email) {
        constraints.push(where('email', '==', filters.email));
      }
      
      // Always order by submission date, newest first
      constraints.push(orderBy('submittedAt', 'desc'));
      
      if (filters.limit) {
        constraints.push(limit(filters.limit));
      }
      
      q = query(q, ...constraints);
    } else {
      // Default ordering if no filters
      q = query(q, orderBy('submittedAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const applications: ApplicationData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      applications.push({
        id: doc.id,
        ...data,
        // Convert Timestamp back to Date
        submittedAt: data.submittedAt?.toDate(),
        reviewedAt: data.reviewedAt?.toDate(),
      } as ApplicationData);
    });
    
    return applications;
  } catch (error) {
    console.error('Error getting applications:', error);
    throw new Error('Failed to retrieve applications');
  }
}

/**
 * Update an existing application (e.g., change status, add notes)
 * @param id The application ID
 * @param updates The fields to update
 * @returns True if update was successful
 */
export async function updateApplication(id: string, updates: Partial<ApplicationData>): Promise<boolean> {
  try {
    const { db } = getFirebase();
    
    const docRef = doc(db, 'applications', id);
    
    // Process any date fields to convert to Firestore Timestamp
    const updateData = { ...updates };
    if (updateData.reviewedAt instanceof Date) {
      updateData.reviewedAt = Timestamp.fromDate(updateData.reviewedAt);
    }
    
    await updateDoc(docRef, updateData);
    
    // Send status update notification if status has changed
    if (updates.status) {
      await sendStatusUpdateNotification(id, updates.status);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating application:', error);
    throw new Error('Failed to update application');
  }
}

/**
 * Send notification to admins about new application
 * @param application The application data
 */
async function sendApplicationNotification(application: ApplicationData): Promise<void> {
  // This would normally call your email service or notification system
  // For now, we'll just log it
  console.log('New application notification:', application.fullName, application.email);
  
  // In a real implementation, you would use an email service like SendGrid, Mailchimp, etc.
  // Example: await sendEmail('admin@barischarity.org', 'New Volunteer Application', emailTemplate);
}

/**
 * Send notification to applicant about status update
 * @param id The application ID
 * @param status The new status
 */
async function sendStatusUpdateNotification(id: string, status: string): Promise<void> {
  try {
    // Get the application to get the email
    const application = await getApplicationById(id);
    
    if (!application) {
      throw new Error('Application not found');
    }
    
    // This would normally call your email service or notification system
    console.log('Status update notification to:', application.email, 'New status:', status);
    
    // In a real implementation, you would use an email service
    // Example: await sendEmail(application.email, 'Your Volunteer Application Status Update', emailTemplate);
    
  } catch (error) {
    console.error('Error sending status notification:', error);
  }
}

// Additional functions for application management
export const applicationUtils = {
  // Format the application data for display
  formatApplicationData(app: ApplicationData): any {
    return {
      ...app,
      submittedAtFormatted: app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A',
      statusLabel: getStatusLabel(app.status),
      interestsFormatted: formatInterests(app.interests),
    };
  },
  
  // Get applications for a specific administrator
  async getAssignedApplications(adminId: string): Promise<ApplicationData[]> {
    // Implementation would depend on your admin assignment logic
    return getApplications(); // Default to all for now
  }
};

// Helper functions
function getStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'Pending Review',
    'under-review': 'Under Review',
    'accepted': 'Accepted',
    'rejected': 'Rejected'
  };
  
  return statusMap[status] || status;
}

function formatInterests(interests: ApplicationInterests): string[] {
  const result: string[] = [];
  
  if (interests.communityOutreach) result.push('Community Outreach');
  if (interests.educationalSupport) result.push('Educational Support');
  if (interests.fundraising) result.push('Fundraising & Events');
  if (interests.administrativeSupport) result.push('Administrative Support');
  if (interests.globalProjects) result.push('Global Projects');
  if (interests.partnershipDevelopment) result.push('Partnership Development');
  
  return result;
}