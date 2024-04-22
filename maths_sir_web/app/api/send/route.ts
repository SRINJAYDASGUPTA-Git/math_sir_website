import { Resend } from 'resend';
import * as React from 'react';
import ReviewEmail from '@/components/shared/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(body:{
    authorName:string,
    authorImage:string,
    reviewText:string,
}) {
  try {
    const { authorName, authorImage, reviewText } = body;
    const { data, error } = await resend.emails.send({
      from: 'contact@becauseofmaths.in',
      to: ['dasguptasrinjayyt2004@gmail.com'],
      subject: `Contact message from ${authorName}`,
      react: ReviewEmail({ authorImage, authorName, reviewText }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}