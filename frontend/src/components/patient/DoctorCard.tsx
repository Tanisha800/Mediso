"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export interface PatientDoctor {
  id: string;
  name: string;
  specialization: string;
  rating?: number;
  isAvailable: boolean;
  image?: string;
}

interface DoctorCardProps {
  doctor: PatientDoctor;
  onBook: (doctor: PatientDoctor) => void;
}

export function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 flex flex-col gap-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:border-[#009866]/30 backdrop-blur-sm relative overflow-hidden">
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center font-black text-2xl text-slate-400 group-hover:bg-[#009866]/10 group-hover:text-[#009866] group-hover:border-[#009866]/20 transition-all shrink-0 overflow-hidden shadow-inner">
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
          ) : (
            doctor.name.replace("Dr. ", "").charAt(0)
          )}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white truncate tracking-tight mb-2">
            {doctor.name}
          </h3>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-[0.15em] border border-slate-200/50 dark:border-slate-700/50">
            {doctor.specialization}
          </span>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-100/50 dark:border-amber-900/30">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-[10px] font-black">{doctor.rating?.toFixed(1) || "4.8"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {doctor.isAvailable && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${doctor.isAvailable ? "bg-[#009866]" : "bg-slate-300 dark:bg-slate-600"}`}></span>
              </span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {doctor.isAvailable ? "Available" : "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button
          onClick={() => onBook(doctor)}
          disabled={!doctor.isAvailable}
          className="w-full h-12 rounded-2xl bg-[#009866] hover:bg-[#007a52] text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-[#009866]/20 hover:shadow-[#009866]/40 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
