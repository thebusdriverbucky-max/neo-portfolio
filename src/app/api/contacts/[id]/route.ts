import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE - Delete single message by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // 👈 Promise!
) {
  try {
    const { id } = await params;  // 👈 await!

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.contact.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}

// PATCH - Mark single message as read
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // 👈 Promise!
) {
  try {
    const { id } = await params;  // 👈 await!

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: { read: true }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}
