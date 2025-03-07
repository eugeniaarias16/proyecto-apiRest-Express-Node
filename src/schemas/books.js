import z from "zod";

const bookSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be a string.",
    required_error: "Title is required.",
  }),
  author: z.string({
    invalid_type_error: "Author must be a string.",
    required_error: "Author is required.",
  }),
  year:z.number().int().min(1455).max(2025),
  pages:z.number().int().positive(),
  genre:z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Book genre is required.',
      invalid_type_error: 'Book genre must be an array of enum Genre.'
    }
  )
});

export const validateSchemaBook=(book)=> bookSchema.safeParse(book);
export const validatePartialSchemaBook=(book)=> bookSchema.partial().safeParse(book);