import ContactEmailTemplate from "@/components/shared/ContactEmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Tag {
  name: string;
  value: string;
}

interface Content {
    authorName: string;
    authorImage: string;
    reviewText: string;
}

interface Props {

  from: string;
  to: string | string[];
  bcc?: string | string[];
  cc?: string | string[];
  html?: string;
  reply_to?: string;
  subject: string;
  content: Content;
  headers?: any;
  attachments?: Buffer | string;
  tags?: Tag[];
}
export async function POST(request: NextRequest) {
    const body = await request.json();
    let{from, to, bcc, cc, html, reply_to, subject, content, headers, attachments, tags}: Props = body;
  try {
    await resend.emails.send({
      from,
      to,
      subject,
      react: ContactEmailTemplate({ 
        ...content
       }),
      text: subject, // Add the missing 'text' property
    });

    return NextResponse.json({status: 200});
  } catch (error) {
    return NextResponse.json({ error });
  }
}
