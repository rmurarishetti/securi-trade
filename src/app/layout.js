import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SecuriTrade.",
  description: "Multi market. Round-the-clock trading.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
          <div className={``}>
            <div className={`$xl:max-w-full w-full`}>
              <Navbar />
            </div>
          </div>

          <main>{children}</main>
          <Footer />
        </body>
    </html>
  );
}
