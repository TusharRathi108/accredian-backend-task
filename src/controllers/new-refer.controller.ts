import { Request, Response } from "express";
import { ReferralFormSchema } from "../schemas/refer-schema";
import prisma from "../../prisma/client";

export const newRefer = async (req: Request, res: Response) => {
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
        ReferrerPhone: parseInt(rphone),
        SenderName: name,
        SenderEmail: email,
        SenderPhone: parseInt(phone),
        SenderMessage: message,
      },
    });

    return res.status(200).json({ data: formData });
  } catch (error) {
    console.log(error);
    // Handle any unexpected errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
