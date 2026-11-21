import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminUser, UserRole } from "../types";

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  demoLogin: (role?: UserRole) => void;
  logout: () => void;
  updateUser: (updated: Partial<AdminUser>) => void;
  hasPermission: (module: string) => boolean;
  switchRole: (role: UserRole) => void;
}

const DEFAULT_ADMIN: AdminUser = {
  id: "usr-1",
  name: "Rajesh Sharma",
  email: "admin@vratsystem.com",
  role: "Super Admin",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
  lastLogin: "Today, 09:30 AM",
  active: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem("vrat_admin_session");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_ADMIN;
      }
    }
    return DEFAULT_ADMIN; // pre-authenticated for seamless demonstration, or can be logged out
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("vrat_admin_session", JSON.stringify(user));
    } else {
      localStorage.removeItem("vrat_admin_session");
    }
  }, [user]);

  const login = (email: string, pass: string): boolean => {
    // accept default admin or any demo credentials
    if (
      (email.toLowerCase() === "admin@vratsystem.com" && pass === "admin123") ||
      (email.includes("@") && pass.length >= 4)
    ) {
      const loggedUser: AdminUser = {
        id: "usr-" + Date.now(),
        name: email.split("@")[0].toUpperCase() + " (Admin)",
        email: email,
        role: "Super Admin",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format",
        lastLogin: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        active: true,
      };
      setUser(loggedUser);
      return true;
    }
    return false;
  };

  const demoLogin = (role: UserRole = "Super Admin") => {
    const roleNames: Record<UserRole, string> = {
      "Super Admin": "Rajesh Sharma (Super Admin)",
      "Content Manager": "Pooja Verma (Content Lead)",
      "SEO Manager": "Amit Patel (SEO Specialist)",
      "Sales Manager": "Vikram Malhotra (Head of Sales)",
      "Support Manager": "Suresh Nair (Support Head)",
      "HR Manager": "Ananya Sen (HR Lead)",
      "Editor": "Rohan Gupta (Editor)",
    };
    setUser({
      id: "usr-demo",
      name: roleNames[role] || "Demo Admin",
      email: `${role.toLowerCase().replace(/\s+/g, ".")}@vratsystem.com`,
      role: role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
      lastLogin: "Just now",
      active: true,
    });
  };

  const logout = () => {
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
        login,
        demoLogin,
        logout,
        updateUser,
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
