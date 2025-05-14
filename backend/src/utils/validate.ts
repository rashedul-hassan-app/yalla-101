import { z } from "zod";

export const paginationSchema = z.object({
  q: z.string().min(2),
  page: z.number().gt(0),
  limit: z.number().gt(0).lt(50),
});
