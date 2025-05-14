import { Router } from "express";
import { searchPatients } from "../services/patientService";
import { paginationSchema } from "../utils/validate";
import { z } from "zod";

const router = Router();

router.get("/", (req, res) => {
  let refinedData;
  try {
    const value: any = req.query;
    refinedData = paginationSchema.parse({
      q: value.q,
      page: parseInt(value.page),
      limit: parseInt(value.limit),
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }

  const { q, page, limit } = refinedData;
  const { total, data } = searchPatients(q, page, limit);
  const nextPage =
    page * limit < total
      ? `/patients?q=${q}&page=${page + 1}&limit=${limit}`
      : null;

  res.json({ total, page, limit, nextPage, data });
});

export default router;
