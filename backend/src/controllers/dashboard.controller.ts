import { Request, Response } from "express";
import { DashboardRepository } from "../services/dashboard.repository";

export class DashboardController {
    constructor(private service: DashboardRepository) { }

    getDashboard = async (req: Request, res: Response) => {
        try {
            // Fetch all data in parallel
            const [latestStats, alerts, traffic, appointments] = await Promise.all([
                this.service.getLatestStats(),
                this.service.getAlerts(),
                this.service.getTraffic(),
                this.service.getAppointments()
            ]);

            // Construct the exact object the frontend is expecting
            const payload = {
                revenue: latestStats?.totalRevenue || 0,
                patients: latestStats?.totalPatients || 0,
                doctors: latestStats?.activeDoctors || 0,
                alerts: alerts || [],
                traffic: traffic || [],
                appointments: appointments || []
            };

            res.status(200).json(payload);
        } catch (error) {
            console.error("Dashboard error:", error);
            res.status(500).json({
                message: "Failed to fetch dashboard",
            });
        }
    };
}