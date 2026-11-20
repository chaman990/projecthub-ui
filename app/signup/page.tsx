"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Rocket } from "lucide-react";
import { signupSchema, type SignupFormValues } from "@/lib/validations/auth";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    // Replace with your FastAPI registration call
    console.log("Signup data:", data);
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Branding Panel */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#172578] via-[#0e1754] to-[#080d36] text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute bottom-0 left-6 w-16 h-40 bg-white/5 rounded-t-md pointer-events-none" />
          <div className="absolute bottom-0 right-8 w-20 h-52 bg-white/5 rounded-t-md pointer-events-none" />

          <div className="flex-1 flex flex-col items-center justify-center text-center z-10 my-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mb-5 shadow-lg">
              <Rocket className="w-9 h-9 text-sky-400 -rotate-12" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-2">
              ProjectHub
            </h1>
            <p className="text-indigo-200 text-sm font-medium">
              Plan. Collaborate. Achieve.
            </p>
          </div>

          <div className="z-10 flex justify-center mt-4">
            <svg
              viewBox="0 0 280 120"
              className="w-full max-w-[240px] h-auto"
              fill="none"
              xmlns="http://w3.org"
            >
              <rect x="20" y="95" width="240" height="8" rx="4" fill="#312E81" />
              <circle cx="75" cy="48" r="12" fill="#FDBA74" />
              <path d="M55 95C55 78 63 66 75 66C87 66 95 78 95 95H55Z" fill="#FACC15" />
              <circle cx="140" cy="42" r="12" fill="#FDBA74" />
              <path d="M118 95C118 75 127 62 140 62C153 62 162 75 162 95H118Z" fill="#38BDF8" />
              <circle cx="205" cy="48" r="12" fill="#FDBA74" />
              <path d="M185 95C185 78 193 66 205 66C217 66 225 78 225 95H185Z" fill="#818CF8" />
              <rect x="115" y="72" width="50" height="23" rx="3" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
              <circle cx="140" cy="83" r="3" fill="#818CF8" />
            </svg>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-sm w-full mx-auto">
            <div className="text-center mb-7">
              <h2 className="text-2xl font-bold text-slate-900">
                Create an Account
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Get started with your ProjectHub workspace
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Full Name */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full name"
                    {...register("fullName")}
                    className={`w-full pl-11 pr-4 py-3 text-sm text-slate-800 bg-white border rounded-lg focus:outline-none focus:ring-2 transition placeholder:text-slate-400 ${
                      errors.fullName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-200 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    {...register("email")}
                    className={`w-full pl-11 pr-4 py-3 text-sm text-slate-800 bg-white border rounded-lg focus:outline-none focus:ring-2 transition placeholder:text-slate-400 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-200 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className={`w-full pl-11 pr-4 py-3 text-sm text-slate-800 bg-white border rounded-lg focus:outline-none focus:ring-2 transition placeholder:text-slate-400 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-200 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                    className={`w-full pl-11 pr-4 py-3 text-sm text-slate-800 bg-white border rounded-lg focus:outline-none focus:ring-2 transition placeholder:text-slate-400 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-200 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#4338CA] hover:bg-[#3730A3] disabled:opacity-60 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-150 cursor-pointer"
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {/* Footer Link */}
            <p className="mt-6 text-center text-xs text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#4338CA] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
