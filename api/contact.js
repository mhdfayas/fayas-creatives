import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Send email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "mhdfayas464@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}