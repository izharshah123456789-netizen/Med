"use client";

import React, { useEffect } from "react";
import { useAuth, type UserRole } from "../../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
};

const roleRoutes: Record<UserRole, string> = {
  patient: "/patient/dashboard",
  reception: "/reception/dashboard",
  doctor: "/doctor/dashboard",
  owner: "/owner/dashboard",
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isReady, user } = useAuth();
  const hasAccess =
    isAuthenticated && (!allowedRoles || (!!user && allowedRoles.includes(user.role)));

  useEffect(() => {
    if (!isReady || hasAccess) return;
    const target =
      isAuthenticated && user ? roleRoutes[user.role] : "/signin";
    if (window.location.pathname === target) return;
    window.history.replaceState({}, "", target);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, [hasAccess, isAuthenticated, isReady, user]);

  if (!isReady || !hasAccess) return null;
  return <>{children}</>;
}

export default ProtectedRoute;
