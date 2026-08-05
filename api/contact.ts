import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, company, email, phone, projectType, supportType, message } = req.body;

    const { data, error } = await resend.emails.send({
      from: 'Expeons Website <no-reply@notifications.expeons.com>', // Using a subdomain to avoid Zoho conflicts
      to: ['info@expeons.com'], 
      subject: `New Inquiry from ${name} - ${projectType}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Support Type:</strong> ${supportType}</p>
        <br/>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
