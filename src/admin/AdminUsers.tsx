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
  Lock
} from "lucide-react";

export default function AdminUsers() {
  const { user } = useAuth();

  const [users, setUsers] = useState<AdminUser[]>([
    { id: "usr-1", name: "Rajesh Sharma", email: "admin@vratsystem.com", role: "Super Admin", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format", lastLogin: "Today, 09:30 AM", active: true },
    { id: "usr-2", name: "Pooja Verma", email: "pooja.content@vratsystem.com", role: "Content Manager", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format", lastLogin: "Yesterday, 04:15 PM", active: true },
    { id: "usr-3", name: "Vikram Malhotra", email: "vikram.sales@vratsystem.com", role: "Sales Manager", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format", lastLogin: "Aug 22, 11:20 AM", active: true },
    { id: "usr-4", name: "Suresh Nair", email: "suresh.support@vratsystem.com", role: "Support Manager", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format", lastLogin: "Aug 21, 02:40 PM", active: true },
    { id: "usr-5", name: "Ananya Sen", email: "ananya.hr@vratsystem.com", role: "HR Manager", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format", lastLogin: "Aug 20, 10:00 AM", active: true },
  ]);

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isNew, setIsNew] = useState(false);

  const rolesList: UserRole[] = [
    "Super Admin",
    "Content Manager",
    "SEO Manager",
    "Sales Manager",
    "Support Manager",
    "HR Manager",
    "Editor"
  ];

  const handleCreateNew = () => {
    setEditingUser({
      id: "usr-" + Date.now(),
      name: "",
      email: "",
      role: "Content Manager",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
      lastLogin: "Never",
      active: true,
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !editingUser.name || !editingUser.email) return;

    if (isNew) {
      setUsers([...users, editingUser]);
    } else {
      setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    }
    setEditingUser(null);
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
          <p className="text-slate-400 text-xs mt-1">Manage administrative accounts, role-based module permissions, and active sessions.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Admin User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Last Login</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-slate-800" />
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
                  <td className="p-4 text-slate-400 text-[11px]">{u.lastLogin}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => { setEditingUser(u); setIsNew(false); }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {u.id !== "usr-1" && (
                      <button
                        onClick={() => {
                          if (confirm(`Remove user "${u.name}"?`)) {
                            setUsers(users.filter((item) => item.id !== u.id));
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
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

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">{isNew ? "Add Admin User" : "Edit User Details"}</h2>
              <button onClick={() => setEditingUser(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Administrative Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  {rolesList.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={editingUser.avatar}
                  onChange={(e) => setEditingUser({ ...editingUser, avatar: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
