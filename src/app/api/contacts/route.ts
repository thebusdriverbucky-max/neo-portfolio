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

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута
const MAX_REQUESTS = 3; // 3 запроса в минуту

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
             request.headers.get('x-real-ip') || 
             'unknown';
  return `contact_${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW };
  }

  if (entry.count >= MAX_REQUESTS) {
    const resetIn = entry.resetTime - now;
    return { allowed: false, remaining: 0, resetIn };
  }

  entry.count++;
  rateLimitMap.set(key, entry);
  
  return { 
    allowed: true, 
    remaining: MAX_REQUESTS - entry.count,
    resetIn: entry.resetTime - now 
  };
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

// ============================================
// POST - Create new contact
// ============================================
export async function POST(request: NextRequest) {
  try {
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

// ============================================
// GET - Get all contacts
// ============================================
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
