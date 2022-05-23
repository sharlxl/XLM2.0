import { nullable, z } from "zod";

export const MangaSchema = z.array(
  z.object({
    mal_id: z.number(),
    title: z.string(),
    images: z.object({ jpg: z.object({ image_url: z.string() }) }),
    rank: z.number().nullable(),
    status: z.string(),
    chapters: z.number().nullable(),
  })
);
