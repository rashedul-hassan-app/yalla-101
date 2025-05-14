import { Router } from "express";
import Joi from "joi";
import { v4 as uuid } from "uuid";

interface Appointment {
  patientId: string;
  doctorId: string;
  start: string;
  end: string;
}
const Appointments: Appointment[] = Array.from({ length: 50 }).map((_, i) => ({
  patientId: uuid(),
  doctorId: `Patient ${i + 1}`,
  start: Date.now().toString() + i * 10000,
  end: (Date.now() + i * 60 * 60 * 1000).toString(),
}));
console.log(Appointments);

const schema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
  start: Joi.date().required(),
  end: Joi.date().greater(Joi.ref("start")).required(),
});

const router = Router();

router.post("/", (req, res) => {
  const { error, value } = schema.validate(req.body);
  // TODO:
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { patientId, doctorId, start, end } = value;
  const booked = Appointments.some(
    (appointment) =>
      appointment.doctorId === doctorId &&
      appointment.start === Date.parse(start).toString()
  );
  if (booked) {
    return res.status(409).json({ error: "Doctor is not available." });
  }
  Appointments.push({
    patientId,
    doctorId,
    start: Date.parse(start).toString(),
    end: Date.parse(end).toString(),
  });
  console.log("Appointments", Appointments[Appointments.length - 1]);
  res.status(201).json({ message: "Appointment scheduled." });
});

router.get("/getLists", (req, res) => {
  const appointmentLists = Appointments;
  res.status(200).json({
    total: appointmentLists.length,
    data: appointmentLists,
  });
});

export default router;
