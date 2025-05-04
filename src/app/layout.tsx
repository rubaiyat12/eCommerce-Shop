import Navbar from "@/components/Navbar";
import "./globals.css";
import ReduxProvider from "@/Redux/Provider";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/ThemeProvider"; 

export const metadata = {
  title: "ProductApp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
