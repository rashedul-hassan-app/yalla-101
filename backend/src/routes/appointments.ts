import { Router } from 'express';
import Joi from 'joi';

interface Appointment { patientId: string; doctorId: string; start: Date; end: Date; }
const appointments: Appointment[] = [];

const schema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
  start: Joi.date().required(),
  end: Joi.date().greater(Joi.ref('start')).required()
});

const router = Router();

router.post('/', (req, res) => {
  const { error, value } = schema.validate(req.body);
  // TODO:

  
  res.status(201).json({ message: 'Appointment scheduled.' });
});

export default router;
