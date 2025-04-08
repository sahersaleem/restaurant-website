import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Middleware function to check the token in cookies
export async function middleware(request: NextRequest) {
  // Retrieve the token from cookies
  const token = request.cookies.get('token');

  // If no token found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the token
    const {payload}= await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
    console.log("Verified Token: ", payload);

    // Allow the request to continue if token is valid
    return NextResponse.next();
  } catch (error) {
    // Handle invalid token scenario
    console.error('Invalid Token:', error);
    return NextResponse.json({ message: 'Unauthorized - Invalid Token' }, { status: 401 });
  }
}

// Specify which routes this middleware applies to
export const config = {
  matcher: ['/abcd'], // List of routes where this middleware is applied
};
