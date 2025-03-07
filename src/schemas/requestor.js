import z from "zod";

const requestorSchema = z.object({
  nameRequestor: z.string({
    invalid_type_error: "Name's Requestor must be a string.",
    required_error: "Name's Requestor is required."
  }),
  
  lastNameRequestor: z.string({
    invalid_type_error: "Last Name's Requestor must be a string.",
    required_error: "Last Name's Requestor is required."
  }),
  

  id: z.number().int().positive({
    invalid_type_error: "Requestor's ID must be a number.",
    required_error: "Requestor's ID is required."
  }),
  

  cellphoneRequestor: z.string()
    .regex(/^\d{9,12}$/, {
      message: "Phone number must have between 9 and 12 digits"
    }),
  

  email: z.string()
    .email({ message: "Must be a valid email address" })
    .optional(),
    
  address: z.string().optional()
});

export const validateSchemaRequestor = (requestor) => requestorSchema.safeParse(requestor);
export const validatePartialSchemaRequestor = (requestor) => requestorSchema.partial().safeParse(requestor);