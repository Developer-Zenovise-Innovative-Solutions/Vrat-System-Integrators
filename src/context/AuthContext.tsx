import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminUser, UserRole } from "../types";

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
  hasPermission: (module: string) => boolean;
  switchRole: (role: UserRole) => void;
}

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-1",
    name: "Rajesh Sharma",
    email: "admin@vratsystem.com",
    password: "admin123",
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
    lastLogin: "Today, 09:30 AM",
    active: true,
  },
  {
    id: "usr-2",
    name: "Nimesh Patel",
    email: "Nimesh.patel@vratsystem.co.in",
    password: "admin123",
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format",
    lastLogin: "Today, 10:00 AM",
    active: true,
  },
  {
    id: "usr-3",
    name: "Pooja Verma",
    email: "pooja.content@vratsystem.com",
    password: "admin123",
    role: "Content Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format",
    lastLogin: "Yesterday, 04:15 PM",
    active: true,
  },
  {
    id: "usr-4",
    name: "Vikram Malhotra",
    email: "Sales@vratsystem.co.in",
    password: "admin123",
    role: "Sales Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format",
    lastLogin: "Aug 22, 11:20 AM",
    active: true,
  },
  {
    id: "usr-5",
    name: "Suresh Nair",
    email: "Service@vratsystem.co.in",
    password: "admin123",
    role: "Support Manager",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format",
    lastLogin: "Aug 21, 02:40 PM",
    active: true,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Registered admin users in local storage
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem("vrat_admin_users");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ADMIN_USERS;
      }
    }
    return INITIAL_ADMIN_USERS;
  });

  // Current logged in user session (null by default for protected route enforcement)
  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem("vrat_admin_session");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem("vrat_admin_users", JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("vrat_admin_session", JSON.stringify(user));
    } else {
      localStorage.removeItem("vrat_admin_session");
    }
  }, [user]);

  const addAdminUser = (newUser: AdminUser) => {
    setAdminUsers((prev) => [...prev, newUser]);
  };

  const updateAdminUser = (id: string, updated: Partial<AdminUser>) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
    );
    // If updating current user's profile
    if (user && user.id === id) {
      setUser((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const deleteAdminUser = (id: string) => {
    setAdminUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check against all registered admin users
    const matchedUser = adminUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail &&
        (u.password === pass || (!u.password && pass === "admin123"))
    ) || (
      // Built-in emergency fallbacks for owner & admin
      (cleanEmail === "admin@vratsystem.com" ||
       cleanEmail === "nimesh.patel@vratsystem.co.in" ||
       cleanEmail === "nimeshpatel.vsi@gmail.com") && pass === "admin123"
        ? {
            id: "usr-owner",
            name: "Nimesh Patel (Administrator)",
            email: cleanEmail,
            role: "Super Admin" as UserRole,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
            lastLogin: "Just now",
            active: true,
            password: "admin123",
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
    const roleNames: Record<UserRole, string> = {
      "Super Admin": "Nimesh Patel (Super Admin)",
      "Content Manager": "Pooja Verma (Content Lead)",
      "SEO Manager": "Amit Patel (SEO Specialist)",
      "Sales Manager": "Vikram Malhotra (Head of Sales)",
      "Support Manager": "Suresh Nair (Support Head)",
      "HR Manager": "Ananya Sen (HR Lead)",
      "Editor": "Rohan Gupta (Editor)",
    };
    const demoUser: AdminUser = {
      id: "usr-demo-" + role.toLowerCase().replace(/\s+/g, "-"),
      name: roleNames[role] || "Demo Admin",
      email: `${role.toLowerCase().replace(/\s+/g, ".")}@vratsystem.co.in`,
      role: role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
      lastLogin: "Just now",
      active: true,
      password: "admin123",
    };
    setUser(demoUser);
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
        adminUsers,
        login,
        demoLogin,
        logout,
        updateUser,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
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
