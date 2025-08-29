import Script from "next/script";
import { Jua, Quicksand } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/effect-coverflow";
import Aos from "./Aos";
import "aos/dist/aos.css";
import { AppContextProvider } from "@/context/AppContext";
import TawtoMessenger from "@/components/tawktoMessenger";
import WhatsAppButton from "@/components/whatsapp-button";

const jua = Jua({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jua",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata = {
  title: "Wild Odysseys Tanzania - Safari Adventures & Mountain Expeditions",
  description:
    "Discover the wild beauty of Tanzania with expertly crafted safari adventures, mountain expeditions, and cultural experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} ${jua.variable} overflow-x-hidden`}
      >
        {/* ✅ Correct way to load GA4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}');
            `,
          }}
        />

        <AppContextProvider>
          <TawtoMessenger />
          <WhatsAppButton />

          <Aos />
          <div className="overflow-hidden">{children}</div>
        </AppContextProvider>
      </body>
    </html>
  );
}
