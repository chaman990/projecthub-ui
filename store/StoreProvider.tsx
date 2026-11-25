"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { fetchCurrentUser } from "./slices/authSlice";
import { usePathname } from "next/navigation";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const hasFetched = useRef(false);
  const PUBLIC_AUTH_ROUTES = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const pathname = usePathname();
  useEffect(() => {
    if (hasFetched.current) return;
    if (PUBLIC_AUTH_ROUTES.includes(pathname)) return;

    hasFetched.current = true;
    store.dispatch(fetchCurrentUser());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
