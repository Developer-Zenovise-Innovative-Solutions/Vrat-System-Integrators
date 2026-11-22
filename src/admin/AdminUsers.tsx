import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AdminUser, UserRole } from "../types";
import {
  Shield,
  Users,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  CheckCircle2,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Sparkles
} from "lucide-react";

export default function AdminUsers() {
  const { user, adminUsers, addAdminUser, updateAdminUser, deleteAdminUser } = useAuth();

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState("");

  const rolesList: UserRole[] = [
    "Super Admin",
    "Content Manager",
    "SEO Manager",
    "Sales Manager",
    "Support Manager",
    "HR Manager",
    "Editor",
  ];

  const handleCreateNew = () => {
    const generatedPass = "vrat@" + Math.floor(1000 + Math.random() * 9000);
    setEditingUser({
      id: "usr-" + Date.now(),
      name: "",
      email: "",
      role: "Content Manager",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
      lastLogin: "Never",
      active: true,
      password: generatedPass,
    });
    setPasswordInput(generatedPass);
    setShowPassword(true);
    setIsNew(true);
  };

  const handleEdit = (u: AdminUser) => {
    setEditingUser(u);
    setPasswordInput(u.password || "admin123");
    setShowPassword(false);
    setIsNew(false);
  };

  const generateRandomPassword = () => {
    const randomPass = "vrat#" + Math.random().toString(36).slice(-6);
    setPasswordInput(randomPass);
    if (editingUser) {
      setEditingUser({ ...editingUser, password: randomPass });
    }
    setShowPassword(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !editingUser.name || !editingUser.email) return;

    const finalUser: AdminUser = {
      ...editingUser,
      password: passwordInput.trim() || "admin123",
    };

    if (isNew) {
      addAdminUser(finalUser);
      setNotification(`Admin user "${finalUser.name}" created successfully with login password!`);
    } else {
      updateAdminUser(finalUser.id, finalUser);
      setNotification(`User "${finalUser.name}" updated successfully!`);
    }

    setEditingUser(null);
    setTimeout(() => setNotification(""), 3500);
  };

  const copyCredentials = (u: AdminUser) => {
    const text = `Email: ${u.email}\nPassword: ${u.password || "admin123"}`;
    navigator.clipboard.writeText(text);
    setCopiedId(u.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            Access Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">System Users & Roles</h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage administrative accounts, passwords for login authentication, and role-based permissions.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Admin User
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Login Password</th>
                <th className="p-4">Last Login</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {adminUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format"}
                      alt={u.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-800"
                    />
                    <div>
                      <div className="font-bold text-white text-sm">{u.name}</div>
                      <div className="text-slate-400 text-[11px]">{u.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-300 bg-slate-900 px-2 py-1 rounded-md border border-slate-800 text-[11px]">
                        {u.password || "admin123"}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyCredentials(u)}
                        title="Copy login details"
                        className="p-1 hover:text-white text-slate-400 rounded transition"
                      >
                        {copiedId === u.id ? (
                          <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400 text-[11px]">{u.lastLogin || "Never"}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                      title="Edit User & Password"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {u.id !== "usr-1" && u.id !== "usr-2" && (
                      <button
                        onClick={() => {
                          if (confirm(`Remove admin account for "${u.name}"?`)) {
                            deleteAdminUser(u.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  {isNew ? "Add Admin User & Password" : "Edit User & Password"}
                </h2>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="e.g. Nimesh Patel"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address (Login Username) *</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="e.g. nimesh.patel@vratsystem.co.in"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-blue-400" />
                    Admin Login Password *
                  </label>
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3 h-3" /> Generate Random
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter login password..."
                    className="w-full pl-3 pr-10 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  This user can log in at <span className="text-blue-300 font-mono">/admin/login</span> using this email and password.
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Administrative Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {rolesList.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Avatar Image URL (Optional)</label>
                <input
                  type="url"
                  value={editingUser.avatar || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save User & Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
