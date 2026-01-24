import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    const result = await prisma.contact.deleteMany({});
    
    return NextResponse.json({ 
      success: true, 
      count: result.count 
    });
  } catch (error) {
    console.error('Error deleting all contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete contacts' },
      { status: 500 }
    );
  }
}
