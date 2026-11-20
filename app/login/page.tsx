"use client"
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Rocket, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginFormValues) => {
    console.log("Data validated ", data);
    // then we will call the api for now lets assume use is authenticated and then we will move the use to home page
  };
  
  return (
    <>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        {/* Main Card Container */}
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
                <rect
                  x="20"
                  y="95"
                  width="240"
                  height="8"
                  rx="4"
                  fill="#312E81"
                />
                <circle cx="75" cy="48" r="12" fill="#FDBA74" />
                <path
                  d="M55 95C55 78 63 66 75 66C87 66 95 78 95 95H55Z"
                  fill="#FACC15"
                />
                <circle cx="140" cy="42" r="12" fill="#FDBA74" />
                <path
                  d="M118 95C118 75 127 62 140 62C153 62 162 75 162 95H118Z"
                  fill="#38BDF8"
                />
                <circle cx="205" cy="48" r="12" fill="#FDBA74" />
                <path
                  d="M185 95C185 78 193 66 205 66C217 66 225 78 225 95H185Z"
                  fill="#818CF8"
                />
                <rect
                  x="115"
                  y="72"
                  width="50"
                  height="23"
                  rx="3"
                  fill="#1E1B4B"
                  stroke="#6366F1"
                  strokeWidth="2"
                />
                <circle cx="140" cy="83" r="3" fill="#818CF8" />
              </svg>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-sm w-full mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Welcome Back
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Sign in to your account
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
              >
                {/* Email Input */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
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
                    <p className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
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

                {/* Error message (left) & Forgot Password link (right) */}
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  {errors.password ? (
                    <p className="text-xs text-red-600 font-medium">
                      {errors.password.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-[#4338CA] hover:text-[#3730A3] hover:underline shrink-0"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>


                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#4338CA] hover:bg-[#3730A3] disabled:opacity-60 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-150 cursor-pointer"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 text-center">
                <span className="text-xs text-slate-400 font-medium">
                  or continue with
                </span>
              </div>

              {/* Social Auth Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  aria-label="Continue with Google"
                  className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center shadow-xs transition cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.7-.2-2.5H12v4.8h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.8z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.8C3.5 21.4 7.4 24 12 24z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Continue with GitHub"
                  className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center shadow-xs transition cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-slate-900" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </button>
              </div>

              {/* Footer Link */}
              <p className="mt-8 text-center text-xs text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#4338CA] hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
