import Navbar from "@/components/Navbar";
import "./globals.css";
import ReduxProvider from "@/Redux/Provider";
import { Toaster } from "sonner";

export const metadata = {
  title: "ProductApp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster/>
      </body>
    </html>
  );
}
