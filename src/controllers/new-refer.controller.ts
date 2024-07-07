import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { ReferralFormSchema } from "../schemas/refer-schema";
import prisma from "../../prisma/client";

export const newRefer = async (req: Request, res: Response) => {
  // Configuration object for snding mail
  let config = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  };

  // creating a transporter object
  let transporter = nodemailer.createTransport(config);

  try {
    // Validate the incoming data
    const data = await req.body;

    // Validate the data with schema
    const validatedData = ReferralFormSchema.safeParse(data);

    // If the data is invalid, return an error
    if (!validatedData.success) {
      const errors = validatedData.error.errors;
      const errorMessages = errors.map((error) => error.message);

      return res.status(400).json({ errors: errorMessages });
    }

    // destructure the validation-data
    const { rname, remail, rphone, name, email, phone, message } =
      validatedData.data;

    // create a new refer-form-data
    const formData = await prisma.refer.create({
      data: {
        ReferrerName: rname,
        ReferrerEmail: remail,
        ReferrerPhone: rphone,
        SenderName: name,
        SenderEmail: email,
        SenderPhone: phone,
        SenderMessage: message,
      },
    });

    // message object
    let emailMessage = {
      from: "rathitushar25@gmail.com",
      to: email,
      subject: "Welcome to Referral Nexus",
      html: `<b>Hello there, thanks for provinding the referral ${rname}!</b>`,
    };

    // send the email using the transporter object we created earlier
    await transporter.sendMail(emailMessage).then(() => {
      return res.status(201).json({
        success: "Your referral email has been sent successfully!",
      });
    });
  } catch (error) {
    // Handle any unexpected errors
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
