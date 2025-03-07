import z from "zod";

const loansSchema = z.object({
  idRequestor: z.string({
    required_error: "Requestor'ID is required.",
  }),

  bookId: z.string({
    invalid_type_error: "Book ID must be a string.",
    required_error: "Book ID is required.",
  }),

  author: z.string({
    invalid_type_error: "Book's author must be a string.",
    required_error: "Book's author is required.",
  }),

  loanDate: z.coerce.date().default(() => new Date()),

  returnDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Return date must be in the future",
  }),

  status: z.enum(["active", "returned", "overdue"]).default("active"),
});

export const validateSchemaLoans = (loans) => loansSchema.safeParse(loans);
export const validatePartialSchemaLoans = (loans) =>
  loansSchema.partial().safeParse(loans);
