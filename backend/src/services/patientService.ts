import { Patient } from "../models/Patient";
import { v4 as uuid } from "uuid";

const patients: Patient[] = Array.from({ length: 50 }).map((_, i) => ({
  id: uuid(),
  name: `Patient ${i + 1}`,
  dob: `19${70 + (i % 30)}-01-01`,
}));

export function searchPatients(
  q: string,
  page: number,
  limit: number
): { total: number; data: Patient[] } {
  let limitDefaullt = 10;
  // TODO:

  if (limit) limitDefaullt = limit;
  const total = patients.length;
  const index = (total / limit) * (page - 1);

  const data = patients.splice(index, limit);

  if (data.length === 0) {
    return { total: total, data: [] };
  }


  return { total: total, data: data };
}