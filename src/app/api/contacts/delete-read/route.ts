import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    const result = await prisma.contact.deleteMany({
      where: { read: true }
    });

    return NextResponse.json({
      success: true,
      count: result.count
    });
  } catch (error) {
    console.error('Error deleting read messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete messages' },
      { status: 500 }
    );
  }
}
