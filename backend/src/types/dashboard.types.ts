import { Alert, TrafficData, Appointment } from "@prisma/client";

export interface DashboardDTO {
    revenue: number;
    patients: number;
    doctors: number;
    alerts: Alert[];
    traffic: TrafficData[];
    appointments: Appointment[];
}