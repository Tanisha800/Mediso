import { prisma } from "../lib/prisma";

export interface IDashboardRepository {
    getLatestStats(): Promise<any>;
    getPatientsCount(): Promise<number>;
    getDoctorsCount(): Promise<number>;
    getAlerts(): Promise<any[]>;
    getTraffic(): Promise<any[]>;
    getAppointments(): Promise<any[]>;
}

export class DashboardRepository implements IDashboardRepository {
    async getLatestStats() {
        return prisma.dashboardStat.findFirst({
            orderBy: { createdAt: "desc" },
        });
    }

    async getPatientsCount() {
        return prisma.user.count({
            where: { role: "patient" },
        });
    }

    async getDoctorsCount() {
        return prisma.doctor.count({
            where: { status: "Active" },
        });
    }

    async getAlerts() {
        return prisma.alert.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
        });
    }

    async getTraffic() {
        return prisma.trafficData.findMany();
    }

    async getAppointments() {
        return prisma.appointment.findMany({
            take: 5,
        });
    }
}