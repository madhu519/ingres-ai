import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INGRES Causal Policy Assistant | CGWB",
  description: "Neuro-Symbolic Groundwater Simulation with TimesFM 2.5 and Structural Causal Inference",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
