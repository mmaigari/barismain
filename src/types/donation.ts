export interface Donation {
  id?: string;
  userId?: string;
  programId: string;
  amount: number;
  name?: string;
  email?: string;
  message?: string;
  anonymous?: boolean;
  surgeries?: number;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
    toDate?: () => Date;
  };
  // Any other fields you might use
}