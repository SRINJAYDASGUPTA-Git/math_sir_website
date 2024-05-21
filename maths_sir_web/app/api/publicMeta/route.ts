import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  const {userId, courses} =  await request.json();

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      courses
    }
  })
  return NextResponse.json({ success: true });
}