import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/schemas';
import { z } from 'zod';
import type { Prisma } from '@prisma/client';

// GET - Get all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
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

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    const dataToCreate: Prisma.ProjectCreateInput = {
      title: validatedData.title,
      description: validatedData.description,
      imageUrl: validatedData.imageUrl,
      technologies: validatedData.technologies,
      longDescription: validatedData.longDescription || null,
      demoUrl: validatedData.demoUrl || null,
      githubUrl: validatedData.githubUrl || null,
      featured: validatedData.featured ?? false,
      order: validatedData.order ?? 0,
    };

    const project = await prisma.project.create({
      data: dataToCreate,
    });

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
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
