import { z } from "zod";

export const domainSchema = z.object({
  domain: z
    .string()
    .min(3, "Domain must be at least 3 characters")
    .max(63, "Domain must be less than 63 characters")
    .regex(/^[a-z0-9-]+$/i, "Only letters, numbers and hyphens allowed"),
});

export const storeSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  domain: z.string().min(3),
  currency: z.string().min(3),
  country: z.string().min(3),
  category: z.string().min(3),
  email: z.string().email("Invalid email address"),
});

export type DomainFormValues = z.infer<typeof domainSchema>;
export type StoreFormValues = z.infer<typeof storeSchema>;
