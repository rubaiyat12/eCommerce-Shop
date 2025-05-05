"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { ReactNode, useEffect } from "react";

const ThemeProvider=({ children }: { children: ReactNode })=> {
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.body.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return <>{children}</>;
}
export default ThemeProvider;
