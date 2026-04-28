export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  timeSlot: string;   // ISO datetime string
  status: AppointmentStatus;
  notes?: string;
}

export interface CreateAppointmentPayload {
  doctorId: string;
  timeSlot: string;
  notes?: string;
}
