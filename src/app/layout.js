import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Harsh Dange | Backend Engineer & AI Enthusiast",
  description:
    "Backend Engineer & AI Enthusiast. I build scalable systems and intelligent applications. Passionate about Python, APIs, and AI-powered solutions.",
  keywords: [
    "Backend Engineer",
    "AI Engineer",
    "Python Developer",
    "FastAPI",
    "Full Stack",
    "Harsh Dange",
  ],
  authors: [{ name: "Harsh Dange" }],
  openGraph: {
    title: "Harsh Dange | Backend Engineer & AI Enthusiast",
    description:
      "Backend Engineer & AI Enthusiast. I build scalable systems and intelligent applications.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
