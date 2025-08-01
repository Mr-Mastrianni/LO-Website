import { Resend } from 'resend';

const resend = new Resend('YOUR_RESEND_API_KEY');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, category, subscribe } = req.body;

    try {
      const data = await resend.emails.send({
        from: 'Living Oncology <noreply@livingoncology.org>',
        to: ['thepresident@livingoncology.org'],
        subject: `New Contact Form Submission: ${category}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><strong>Newsletter Subscription:</strong> ${subscribe ? 'Yes' : 'No'}</p>
        `,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
