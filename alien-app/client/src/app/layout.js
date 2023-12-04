import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"
import Footer from "./components/Footer"
const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500"],
    subsets: ["latin"],
});

export const metadata = {
    title: "Alien app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={poppins.className}>
              <Header/>
              {children}
              <Footer/>
              </body>
        </html>
    );
}
