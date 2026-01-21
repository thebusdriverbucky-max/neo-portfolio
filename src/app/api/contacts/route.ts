import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

// GET all contacts
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST new contact (сохраняем в БД И отправляем email)
export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Валидация
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
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
        to: 'neodesignengineering@gmail.com',
        subject: `🔔 New message from ${name} via Portfolio`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #FFA500; margin-bottom: 20px;">📬 New Portfolio Message</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #333;">From:</strong>
                <p style="margin: 5px 0; color: #666;">${name}</p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #333;">Email:</strong>
                <p style="margin: 5px 0; color: #666;">
                  <a href="mailto:${email}" style="color: #FFA500;">${email}</a>
                </p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #333;">Message:</strong>
                <div style="margin: 10px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #FFA500; border-radius: 5px;">
                  <p style="color: #444; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
                <p>This message was sent via your portfolio contact form.</p>
                <p>Sent at: ${new Date().toLocaleString('ru-RU')}</p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully to neodesignengineering@gmail.com');
    } catch (emailError) {
      console.error('⚠️ Email sending failed (but message saved to DB):', emailError);
    }

    // Возвращаем успех (даже если email не отправился, БД сохранена)
    return NextResponse.json(
      { 
        success: true, 
        data: contact,
        message: 'Message sent successfully'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Error processing contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
