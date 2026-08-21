import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email(),
  passwordHash: z.string().min(1),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;
