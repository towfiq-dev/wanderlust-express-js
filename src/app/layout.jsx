import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Wanderlust — Explore the World",
    template: "%s | Wanderlust",
  },
  description:
    "Discover breathtaking destinations and curated travel experiences with Wanderlust. Book luxury tours, beach holidays, and mountain escapes.",
  keywords: ["travel", "destinations", "tours", "booking", "luxury travel", "wanderlust"],
  openGraph: {
    title: "Wanderlust — Explore the World",
    description: "Your gateway to extraordinary travel experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="font-sans">
        <Navbar />
        <main className="max-w-[1400px] mx-auto">
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </main>
        <Footer />
      </body>
    </html>
  );
}
