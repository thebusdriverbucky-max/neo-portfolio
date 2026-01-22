import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  longDescription: z.string().optional(),
  imageUrl: z.string().min(1, 'URL изображения обязателен'),
  demoUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  technologies: z.array(z.string()).min(1, 'Добавьте хотя бы одну технологию'),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const projects = await prisma.project.findMany({
      where: featured ? { featured: true } : undefined,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validationResult = projectSchema.safeParse(body);

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

    // Get max order for new project
    const maxOrder = await prisma.project.aggregate({
      _max: { order: true },
    });

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        imageUrl: data.imageUrl,
        demoUrl: data.demoUrl || null,
        githubUrl: data.githubUrl || null,
        technologies: data.technologies,
        featured: data.featured || false,
        order: data.order ?? (maxOrder._max.order ?? 0) + 1,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
