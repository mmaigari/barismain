import { NextRequest, NextResponse } from 'next/server';

// Paystack BVN verification endpoint
const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const BVN_VERIFICATION_ENDPOINT = '/bvn/match';

export async function POST(req: NextRequest) {
  try {
    const { bvn } = await req.json();
    
    if (!bvn || bvn.length !== 11) {
      return NextResponse.json(
        { message: 'Please provide a valid 11-digit BVN number' },
        { status: 400 }
      );
    }
    
    // Fetch the secret key from environment variables
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY is not defined in environment variables');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Make request to Paystack BVN verification API
    const response = await fetch(`${PAYSTACK_BASE_URL}${BVN_VERIFICATION_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bvn: bvn,
        // These fields are required for BVN match verification
        account_number: '', // Optional in our case since we're only doing BVN validation
        bank_code: '',      // Optional in our case
        first_name: '',     // Optional in our case
        last_name: '',      // Optional in our case
      }),
    });
    
    const responseData = await response.json();
    
    // Check if the verification was successful
    if (!response.ok || responseData.status === false) {
      console.error('Paystack BVN verification failed:', responseData);
      
      // Handle specific Paystack error codes
      if (responseData.status === false) {
        const errorCode = responseData.code || 'unknown';
        const errorMessage = responseData.message || 'BVN verification failed';
        
        // Common Paystack BVN verification errors
        const errorMap: Record<string, string> = {
          'invalid_bvn': 'The BVN provided is invalid',
          'bvn_not_found': 'BVN not found',
          'failed': 'Verification failed. Please try again later.',
        };
        
        return NextResponse.json(
          { 
            message: errorMap[errorCode] || errorMessage,
            code: errorCode
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { message: 'BVN verification failed. Please try again.' },
        { status: response.status }
      );
    }
    
    // Map the Paystack response data to our expected format
    // Paystack BVN match endpoint returns data in this format
    const formattedData = {
      first_name: responseData.data.first_name,
      last_name: responseData.data.last_name,
      middle_name: responseData.data.middle_name || '',
      dob: responseData.data.dob || '',
      mobile: responseData.data.mobile || responseData.data.phone || '',
      bvn: bvn,
    };
    
    // If successful, return the BVN data
    return NextResponse.json({
      message: 'BVN verification successful',
      data: formattedData,
    });
    
  } catch (error: any) {
    console.error('Error verifying BVN:', error);
    return NextResponse.json(
      { message: 'An error occurred while verifying BVN' },
      { status: 500 }
    );
  }
}