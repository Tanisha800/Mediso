"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { LoginResponse } from "@/types/auth.types";
import { decodeToken } from "@/lib/decodeToken";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Activity, Loader2, Mail, Lock } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

const ROLE_REDIRECT: Record<string, string> = {
  doctor: "/doctor/dashboard",
  patient: "/patient/dashboard",
  admin: "/admin/dashboard",
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      email: "john@gmail.com",
      password: "87654321"
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post<LoginResponse>("/login", values);

      // ✅ Store ONLY token (IMPORTANT FIX)
      localStorage.setItem("token", data.token);

      // ✅ Decode token to get role
      const decoded = decodeToken(data.token);

      // ✅ Safe role-based redirect
      if (decoded?.role && ROLE_REDIRECT[decoded.role]) {
        router.push(ROLE_REDIRECT[decoded.role]);
      } else {
        router.push("/auth/login");
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Invalid email or password.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[480px_1fr] bg-white dark:bg-slate-950 font-sans">
      {/* 🔹 Left Side: Branding & Value Prop */}
      <div className="hidden lg:flex bg-teal-600 dark:bg-teal-900 relative overflow-hidden flex-col justify-between p-16 xl:p-20">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-400/20 blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-24">
            <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center shadow-xl">
              <Activity className="h-6 w-6 text-teal-600" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Mediso</span>
          </div>

          <div className="space-y-8">
            <h1 className="text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight">
              The future of <br />
              <span className="text-teal-200">healthcare</span> <br />
              is here.
            </h1>
            <p className="text-lg text-teal-50/80 max-w-sm font-medium leading-relaxed">
              Streamline your hospital operations with our all-in-one management suite. Trusted by leading clinics worldwide.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-teal-100/40 text-[10px] font-black uppercase tracking-widest">
          © {new Date().getFullYear()} Mediso Platform
        </div>
      </div>

      {/* 🔹 Right Side: Auth Form */}
      <div className="flex flex-col bg-slate-50 dark:bg-slate-950 relative overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16">
          <div className="w-full max-w-[420px] mx-auto">
            <div className="text-center lg:text-left mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Enter your credentials to access your workspace.
              </p>
            </div>

          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-2">
            <div className="border border-slate-100 dark:border-slate-800 rounded-[30px] p-8 md:p-10 shadow-xl shadow-slate-200/40 dark:shadow-none">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-teal-500 transition-colors" />
                    <Input
                      {...register("email")}
                      placeholder="name@hospital.com"
                      className="pl-11 h-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                    />
                  </div>
                  {errors.email && <p className="text-xs font-bold text-rose-500 ml-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</Label>
                    <Link href="#" className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">Forgot?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-teal-500 transition-colors" />
                    <Input
                      type="password"
                      {...register("password")}
                      placeholder="••••••••"
                      className="pl-11 h-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                    />
                  </div>
                  {errors.password && <p className="text-xs font-bold text-rose-500 ml-1">{errors.password.message}</p>}
                </div>

                {error && (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs font-bold text-rose-600 dark:text-rose-400 text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-teal-600/20 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Sign in to Mediso"}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center">
                  Quick Access
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { role: "Admin", email: "john@gmail.com", pass: "87654321", icon: "🛡️" },
                    { role: "Doctor", email: "doctor@test.com", pass: "123456", icon: "🩺" },
                    { role: "Patient", email: "patient@test.com", pass: "123456", icon: "👤" },
                  ].map((cred) => (
                    <button
                      key={cred.role}
                      type="button"
                      onClick={() => {
                        setValue("email", cred.email);
                        setValue("password", cred.pass);
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 hover:border-teal-200 dark:hover:border-teal-800 hover:bg-white dark:hover:bg-slate-900 transition-all group"
                    >
                      <span className="text-lg">{cred.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-tight text-slate-500 group-hover:text-teal-600">{cred.role}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            New to Mediso?{" "}
            <Link href="/auth/register" className="font-black text-teal-600 hover:text-teal-700 underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}
