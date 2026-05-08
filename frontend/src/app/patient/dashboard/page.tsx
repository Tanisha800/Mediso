"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthGuard from "@/components/shared/AuthGuard";
import { SummaryCard } from "@/components/patient/SummaryCard";
import { AppointmentCard } from "@/components/patient/AppointmentCard";
import { Appointment } from "@/types/appointment.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  FileText,
  Bell,
  Stethoscope,
  ArrowRight,
  Plus,
  Loader2,
  CalendarCheck
} from "lucide-react";
import { cancelAppointment } from "@/services/appointment.service";
import { patientDashboardService, PatientDashboardStats } from "@/services/patient/dashboard.service";



export default function PatientDashboardPage() {
  const [stats, setStats] = useState<PatientDashboardStats | null>(null);
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await patientDashboardService.getDashboard();
        setStats(data.stats);
        setUpcoming(data.upcomingAppointments as Appointment[]);
      } catch (e) {
        console.error("Failed to fetch dashboard:", e);
        setError("Failed to load dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <AuthGuard allowedRoles={["patient"]}>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Loading dashboard...</p>
        </div>
      </AuthGuard>
    );
  }

  if (error || !stats) {
    return (
      <AuthGuard allowedRoles={["patient"]}>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-400">
            {error ?? "Something went wrong."}
          </p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard allowedRoles={["patient"]}>
      <div className="space-y-10 animate-in fade-in duration-500 max-w-full mx-auto pb-20 pt-8 px-4 md:px-6">
        {/* 1. Page Header */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 w-20 h-20 bg-[#009866]/10 rounded-full blur-3xl pointer-events-none" />
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white relative z-10">
            Patient Dashboard
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-[0.2em] relative z-10">
            Welcome back, manage your health easily
          </p>
        </div>

        {/* 2. Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Upcoming Appointments"
            value={stats.upcomingCount}
            icon={CalendarDays}
            colorClass="bg-blue-50 dark:bg-blue-900/20"
            iconColorClass="text-blue-600 dark:text-blue-400"
          />
          <SummaryCard
            title="Total Appointments"
            value={stats.totalAppointments}
            icon={CalendarCheck}
            colorClass="bg-[#D1FAE4] dark:bg-emerald-900/40"
            iconColorClass="text-[#009866] dark:text-emerald-400"
          />
          <SummaryCard
            title="Prescriptions"
            value={stats.totalPrescriptions}
            icon={FileText}
            colorClass="bg-amber-50 dark:bg-amber-900/20"
            iconColorClass="text-amber-600 dark:text-amber-400"
          />
          <SummaryCard
            title="Notifications"
            value={stats.unreadNotifications}
            icon={Bell}
            colorClass="bg-rose-50 dark:bg-rose-900/20"
            iconColorClass="text-rose-600 dark:text-rose-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 3. Upcoming Appointments Section */}
            <div className="bg-white dark:bg-slate-900/50 rounded-[32px] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Upcoming Appointments
                  </h2>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-2 font-black">Your next scheduled visits</p>
                </div>
                <Link href="/patient/appointments">
                  <Button variant="ghost" className="text-[#009866] hover:text-[#007a52] hover:bg-[#D1FAE4] font-black text-[10px] uppercase tracking-widest rounded-full px-6">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="relative z-10">
                {upcoming.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                    <CalendarDays className="h-16 w-16 text-slate-200 dark:text-slate-800 mb-4" />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No upcoming appointments</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {upcoming.slice(0, 3).map((appt) => (
                      <AppointmentCard
                        key={appt.id}
                        appointment={appt}
                        onCancel={async (id) => {
                          await cancelAppointment(id);
                          setUpcoming((prev) => prev.filter(a => a.id !== id));
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-8">
            {/* 4. Quick Actions */}
            <div className="bg-white dark:bg-slate-900/50 rounded-[32px] p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">
                Quick Actions
              </h2>
              <div className="space-y-4 relative z-10">
                <Link href="/patient/doctors" className="block">
                  <Button className="w-full h-14 rounded-2xl bg-[#009866] hover:bg-[#007a52] text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-[#009866]/20 hover:shadow-[#009866]/40 transition-all hover:-translate-y-0.5 justify-start px-8">
                    <Plus className="mr-4 h-5 w-5" /> Book Appointment
                  </Button>
                </Link>
                <Link href="/patient/doctors" className="block">
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-black uppercase tracking-widest text-[10px] justify-start px-8 text-slate-600 dark:text-slate-300 transition-all">
                    <Stethoscope className="mr-4 h-5 w-5 text-[#009866]" /> View Doctors
                  </Button>
                </Link>
                <Link href="/patient/history" className="block">
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-black uppercase tracking-widest text-[10px] justify-start px-8 text-slate-600 dark:text-slate-300 transition-all">
                    <FileText className="mr-4 h-5 w-5 text-amber-500" /> Medical History
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}