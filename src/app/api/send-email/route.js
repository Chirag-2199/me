// app/api/send-email/route.js
import { Resend } from 'resend';

const resend = new Resend('re_7KS9ydpY_Dj4ifFEVGrCgPJWvKqiT2X2R');

export async function POST(req) {
    try {
        const { to, subject, text } = await req.json();

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // you can change this once your domain is verified
            to,
            subject,
            text,
        });

        return Response.json({ success: true, data });
    } catch (error) {
        console.error('Email send error:', error);
        return Response.json({ success: false, error: error.message });
    }
}
