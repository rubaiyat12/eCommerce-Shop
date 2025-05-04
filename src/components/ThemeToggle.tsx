"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { toggleTheme } from "@/Redux/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <label className="inline-flex items-center cursor-pointer ml-2">
      <span className="mr-2 text-sm">{mode === "dark" ? "Dark" : "Light"} Mode</span>
      <input
        type="checkbox"
        checked={mode === "dark"}
        onChange={() => dispatch(toggleTheme())}
        className="sr-only"
      />
      <div className="w-10 h-6 bg-gray-300 rounded-full relative transition">
        <div
          className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
            mode === "dark" ? "translate-x-4" : ""
          }`}
        />
      </div>
    </label>
  );
}
