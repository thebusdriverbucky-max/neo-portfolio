import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

// ============================================
// RATE LIMITING SETUP
// ============================================
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Настройки rate limit
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута в миллисекундах
const MAX_REQUESTS = 3; // Максимум 3 запроса в минуту

function getRateLimitKey(request: NextRequest): string {
  // Получаем IP из заголовков (работает на Vercel)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
             request.headers.get('x-real-ip') || 
             'unknown';
  return `contact_${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  // Если нет записи или время сброса прошло - создаем новую
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW };
  }

  // Проверяем лимит
  if (entry.count >= MAX_REQUESTS) {
    const resetIn = entry.resetTime - now;
    return { allowed: false, remaining: 0, resetIn };
  }

  // Увеличиваем счетчик
  entry.count++;
  rateLimitMap.set(key, entry);
  
  return { 
    allowed: true, 
    remaining: MAX_REQUESTS - entry.count,
    resetIn: entry.resetTime - now 
  };
}

// Очистка старых записей каждые 5 минут
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

// ============================================
// API ROUTES
// ============================================

export async function POST(request: NextRequest) {
  try {
    // ✅ ПРОВЕРКА RATE LIMIT
    const rateLimitKey = getRateLimitKey(request);
    const { allowed, remaining, resetIn } = checkRateLimit(rateLimitKey);

    if (!allowed) {
      const resetInSeconds = Math.ceil(resetIn / 1000);
      return NextResponse.json(
        { 
          success: false, 
          error: `Too many requests. Please try again in ${resetInSeconds} seconds.`,
          retryAfter: resetInSeconds
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + resetIn).toISOString(),
            'Retry-After': resetInSeconds.toString()
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Валидация
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Сохранить в БД
    const contact = await prisma.contact.create({
      data: { name, email, message },
    });

    // Отправить email
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_SERVER_USER,
        replyTo: email,
        to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_SERVER_USER,
        subject: `🔔 New message from ${name} via Portfolio`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #FFA500;">📬 New Portfolio Contact</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #FFA500;">
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr>
            <p style="color: #999; font-size: 12px;">
              Sent: ${new Date().toLocaleString('ru-RU')}<br>
              💡 Reply directly to this email to contact ${name}
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${process.env.EMAIL_RECIPIENT || process.env.EMAIL_SERVER_USER}`);
    } catch (emailError) {
      console.error('⚠️ Email sending failed (but message saved to DB):', emailError);
    }

    return NextResponse.json(
      { success: true, data: contact },
      { 
        status: 201,
        headers: {
          'X-RateLimit-Limit': MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': remaining.toString()
        }
      }
    );

  } catch (error) {
    console.error('❌ Error processing contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// PATCH - Mark as Read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: { read: true }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

// DELETE - Delete message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    await prisma.contact.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
