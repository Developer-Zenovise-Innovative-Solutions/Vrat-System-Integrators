import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../types";
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminLogin() {
  const { login, demoLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@vratsystem.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        navigate("/admin");
      } else {
        setError("Invalid email or password. You can use admin@vratsystem.com / admin123 or select a demo role below.");
        setLoading(false);
      }
    }, 400);
  };

  const handleQuickRole = (role: UserRole) => {
    demoLogin(role);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-md w-full relative z-10 animate-fade-up">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-2xl">V</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-xl text-white tracking-wide">VRAT</div>
              <div className="text-xs text-blue-400 font-semibold tracking-widest uppercase">System Integrators</div>
            </div>
          </Link>
          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            Enterprise CMS & Administration Portal
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Sign In to Admin Panel</h2>
            <p className="text-slate-400 text-xs">
              Manage website content, 29 pages, leads CRM, products, and services.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="admin@vratsystem.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-blue-400 hover:underline cursor-pointer" onClick={() => alert("Default demo password is: admin123")}>
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Roles */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Quick Demo Login As:</span>
              <span className="text-blue-400 font-medium">1-Click Access</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRole("Super Admin")}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-white">Super Admin</div>
                  <div className="text-[10px] text-slate-400">All Modules</div>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickRole("Content Manager")}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-white">Content Manager</div>
                  <div className="text-[10px] text-slate-400">Pages & CMS</div>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickRole("Sales Manager")}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-white">Sales / CRM</div>
                  <div className="text-[10px] text-slate-400">Leads & Quotes</div>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickRole("Support Manager")}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-white">Support Head</div>
                  <div className="text-[10px] text-slate-400">Tickets & AMC</div>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Back to Live Website */}
        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
