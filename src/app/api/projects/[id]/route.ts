import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { partialProjectSchema } from '@/lib/schemas';
import { z } from 'zod';
import type { Prisma } from '@prisma/client';

// GET - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const validatedData = partialProjectSchema.parse(body);

    // Используем правильный тип Prisma
    const dataForUpdate: Prisma.ProjectUpdateInput = {};

    if (validatedData.title !== undefined) {
      dataForUpdate.title = validatedData.title;
    }
    if (validatedData.description !== undefined) {
      dataForUpdate.description = validatedData.description;
    }
    if (validatedData.imageUrl !== undefined) {
      dataForUpdate.imageUrl = validatedData.imageUrl;
    }
    if (validatedData.technologies !== undefined) {
      dataForUpdate.technologies = validatedData.technologies;
    }
    if (validatedData.longDescription !== undefined) {
      dataForUpdate.longDescription = validatedData.longDescription || null;
    }
    if (validatedData.demoUrl !== undefined) {
      dataForUpdate.demoUrl = validatedData.demoUrl || null;
    }
    if (validatedData.githubUrl !== undefined) {
      dataForUpdate.githubUrl = validatedData.githubUrl || null;
    }
    if (validatedData.featured !== undefined) {
      dataForUpdate.featured = validatedData.featured;
    }
    if (validatedData.order !== undefined) {
      dataForUpdate.order = validatedData.order;
    }

    const project = await prisma.project.update({
      where: { id },
      data: dataForUpdate,
    });

    return NextResponse.json({ success: true, data: project });
} catch (error: unknown) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { success: false, error: error.issues[0]?.message || 'Validation error' },
      { status: 400 }
    );
  }
  console.error('Error updating project:', error);
  return NextResponse.json(
    { success: false, error: 'Failed to update project' },
    { status: 500 }
  );
}
}

// DELETE - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
