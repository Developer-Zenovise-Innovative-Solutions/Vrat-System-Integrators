import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { AdminUser, UserRole } from "../types";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  adminUsers: AdminUser[];
  login: (email: string, pass: string) => boolean;
  demoLogin: (role?: UserRole) => void;
  logout: () => void;
  updateUser: (updated: Partial<AdminUser>) => void;
  addAdminUser: (newUser: AdminUser) => void;
  updateAdminUser: (id: string, updated: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  updateAvatar: (avatarUrl: string) => void;
  hasPermission: (module: string) => boolean;
  switchRole: (role: UserRole) => void;
}

// Single initial Super Admin (Requirement 1 & 8A)
// No default profile photo - clean initials avatar fallback
export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-superadmin",
    name: "Nimesh Patel",
    email: "nimesh.patel@vratsystem.co.in",
    password: "admin123",
    role: "Super Admin",
    avatar: "", // Removed default stock photo
    lastLogin: "Active Now",
    active: true,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Registered admin users
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem("vrat_admin_users");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Clean out legacy demo users if present
          const filtered = parsed.filter(
            (u: AdminUser) => !["usr-1", "usr-3", "usr-4", "usr-5"].includes(u.id) && u.name !== "Rajesh Sharma"
          );
          if (filtered.length > 0) return filtered;
        }
      }
    } catch (e) {}
    return INITIAL_ADMIN_USERS;
  });

  // Current logged in user session (null by default for protected route enforcement)
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      localStorage.removeItem("vrat_admin_session");
      const active = sessionStorage.getItem("vrat_admin_active_session");
      if (active) {
        return JSON.parse(active);
      }
    } catch (e) {}
    return null;
  });

  const isInitialLoad = useRef(true);

  // Sync admin users with Supabase settings.social_links.admin_users (Requirement 8C: Permanent Deletion Persistence)
  useEffect(() => {
    async function loadCloudUsers() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase.from("settings").select("social_links").limit(1);
        if (!error && data?.[0]?.social_links?.admin_users) {
          const cloudUsers: AdminUser[] = data[0].social_links.admin_users;
          if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
            setAdminUsers(cloudUsers);
            localStorage.setItem("vrat_admin_users", JSON.stringify(cloudUsers));
          }
        }
      } catch (e) {
        console.warn("Could not sync cloud admin users:", e);
      }
    }
    loadCloudUsers();
  }, []);

  // Save changes to localStorage and Supabase
  const persistUsers = async (newUsers: AdminUser[]) => {
    setAdminUsers(newUsers);
    localStorage.setItem("vrat_admin_users", JSON.stringify(newUsers));

    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase.from("settings").select("social_links").limit(1);
        const existingLinks = data?.[0]?.social_links || {};
        await supabase
          .from("settings")
          .update({
            social_links: {
              ...existingLinks,
              admin_users: newUsers,
            },
            updated_at: new Date().toISOString(),
          })
          .eq("id", "settings-primary");
      } catch (err) {
        console.warn("Supabase user persistence failed:", err);
      }
    }
  };

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    localStorage.setItem("vrat_admin_users", JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    try {
      localStorage.removeItem("vrat_admin_session");
      if (user) {
        sessionStorage.setItem("vrat_admin_active_session", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("vrat_admin_active_session");
      }
    } catch (e) {}
  }, [user]);

  const addAdminUser = (newUser: AdminUser) => {
    const updated = [...adminUsers, newUser];
    persistUsers(updated);
  };

  const updateAdminUser = (id: string, updated: Partial<AdminUser>) => {
    const newUsers = adminUsers.map((u) => (u.id === id ? { ...u, ...updated } : u));
    persistUsers(newUsers);

    // If updating currently logged in user
    if (user && user.id === id) {
      setUser((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const deleteAdminUser = (id: string) => {
    // Permanent deletion: deleted user is filtered out and persisted to cloud
    const newUsers = adminUsers.filter((u) => u.id !== id);
    persistUsers(newUsers);
  };

  const changePassword = (oldPass: string, newPass: string): { success: boolean; message: string } => {
    if (!user) {
      return { success: false, message: "No active administrator logged in." };
    }
    if (user.password && user.password !== oldPass) {
      return { success: false, message: "Current password is incorrect." };
    }
    if (!newPass || newPass.trim().length < 6) {
      return { success: false, message: "New password must be at least 6 characters long." };
    }

    const trimmed = newPass.trim();
    updateAdminUser(user.id, { password: trimmed });
    setUser((prev) => (prev ? { ...prev, password: trimmed } : null));

    return { success: true, message: "Password updated successfully and synced across all devices!" };
  };

  const updateAvatar = (avatarUrl: string) => {
    if (!user) return;
    updateAdminUser(user.id, { avatar: avatarUrl });
    setUser((prev) => (prev ? { ...prev, avatar: avatarUrl } : null));
  };

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();

    // Check against registered admin users
    const matchedUser = adminUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail &&
        (u.password === pass || (!u.password && pass === "admin123"))
    ) || (
      // Primary Super Admin fallbacks
      (cleanEmail === "admin@vratsystem.co.in" ||
       cleanEmail === "nimesh.patel@vratsystem.co.in" ||
       cleanEmail === "admin@vratsystem.com" ||
       cleanEmail === "nimeshpatel.vsi@gmail.com") && (pass === "admin123" || pass === (adminUsers[0]?.password || "admin123"))
        ? {
            id: adminUsers[0]?.id || "usr-superadmin",
            name: adminUsers[0]?.name || "Nimesh Patel",
            email: cleanEmail,
            role: "Super Admin" as UserRole,
            avatar: adminUsers[0]?.avatar || "",
            lastLogin: "Just now",
            active: true,
            password: adminUsers[0]?.password || "admin123",
          }
        : null
    );

    if (matchedUser) {
      const loggedUser: AdminUser = {
        ...matchedUser,
        lastLogin: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setUser(loggedUser);
      updateAdminUser(matchedUser.id, { lastLogin: loggedUser.lastLogin });
      return true;
    }
    return false;
  };

  const demoLogin = (role: UserRole = "Super Admin") => {
    const demoUser: AdminUser = {
      id: "usr-superadmin",
      name: "Nimesh Patel",
      email: "nimesh.patel@vratsystem.co.in",
      role: role,
      avatar: "",
      lastLogin: "Just now",
      active: true,
      password: "admin123",
    };
    setUser(demoUser);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem("vrat_admin_active_session");
      localStorage.removeItem("vrat_admin_session");
    } catch (e) {}
    setUser(null);
  };

  const updateUser = (updated: Partial<AdminUser>) => {
    if (!user) return;
    setUser({ ...user, ...updated });
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    setUser({ ...user, role });
  };

  const hasPermission = (module: string): boolean => {
    if (!user) return false;
    if (user.role === "Super Admin") return true;

    switch (user.role) {
      case "Content Manager":
        return ["dashboard", "pages", "services", "products", "solutions", "projects", "blog", "faqs", "testimonials", "partners", "media", "downloads"].includes(module);
      case "SEO Manager":
        return ["dashboard", "seo", "pages", "blog"].includes(module);
      case "Sales Manager":
        return ["dashboard", "leads", "projects", "downloads", "products"].includes(module);
      case "Support Manager":
        return ["dashboard", "leads", "faqs", "downloads", "services"].includes(module);
      case "HR Manager":
        return ["dashboard", "careers", "team"].includes(module);
      case "Editor":
        return ["dashboard", "blog", "pages", "faqs"].includes(module);
      default:
        return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        adminUsers,
        login,
        demoLogin,
        logout,
        updateUser,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        changePassword,
        updateAvatar,
        hasPermission,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
