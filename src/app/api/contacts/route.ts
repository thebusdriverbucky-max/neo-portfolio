import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { redis, withPrefix } from '@/lib/redis';
import { Ratelimit } from "@upstash/ratelimit";

// ============================================
// RATE LIMITING SETUP (Upstash Redis)
// ============================================
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
  prefix: withPrefix("ratelimit"),
});

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] :
    request.headers.get('x-real-ip') ||
    'unknown';
  return ip;
}

// ============================================
// POST - Create new contact
// ============================================
export async function POST(request: NextRequest) {
  try {
    const identifier = getRateLimitKey(request);
    const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

    if (!success) {
      const now = Date.now();
      const resetInSeconds = Math.ceil((reset - now) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please try again in ${resetInSeconds} seconds.`,
          retryAfter: resetInSeconds
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(reset).toISOString(),
            'Retry-After': resetInSeconds.toString()
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: { name, email, message },
    });

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
      console.log(`✅ Email sent successfully`);
    } catch (emailError) {
      console.error('⚠️ Email sending failed (but message saved to DB):', emailError);
    }

    return NextResponse.json(
      { success: true, data: contact },
      {
        status: 201,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
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

// ============================================
// GET - Get all contacts
// ============================================
export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

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
