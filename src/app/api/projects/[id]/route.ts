import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const projectUpdateSchema = z.object({
  title: z.string().min(1, 'Название обязательно').optional(),
  description: z.string().min(1, 'Описание обязательно').optional(),
  longDescription: z.string().optional(),
  imageUrl: z.string().min(1, 'URL изображения обязателен').optional(),
  demoUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  technologies: z.array(z.string()).min(1, 'Добавьте хотя бы одну технологию').optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validationResult = projectUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.longDescription !== undefined && { longDescription: data.longDescription }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(data.demoUrl !== undefined && { demoUrl: data.demoUrl || null }),
        ...(data.githubUrl !== undefined && { githubUrl: data.githubUrl || null }),
        ...(data.technologies !== undefined && { technologies: data.technologies }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.order !== undefined && { order: data.order }),
      },
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
