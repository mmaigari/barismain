import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { transactionId } = await req.json();

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        }
      }
    );

    const data = await response.json();

    if (data.status === 'success' && data.data.status === 'successful') {
      // Here you would typically save the donation details to your database
      
      return NextResponse.json({ 
        success: true,
        data: data.data
      });
    } else {
      return NextResponse.json({ 
        success: false,
        message: 'Payment verification failed'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying Flutterwave payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}