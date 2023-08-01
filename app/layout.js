import "./globals.css";
import { Inter } from "next/font/google";
import "semantic-ui-css/semantic.min.css";
import "./styles/globals.css";
import CustomAmplifyAuthProvider from "./CustomAmplifyAuthProvider";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CampusFestHub App",
  description: "Explore and Share College Fests and events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomAmplifyAuthProvider>
          <nav>
            <MenuBar />
          </nav>
          {children}
          <Footer />
        </CustomAmplifyAuthProvider>
      </body>
    </html>
  );
}
