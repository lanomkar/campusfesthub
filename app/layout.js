import "./globals.css";
import { Inter } from "next/font/google";
import "semantic-ui-css/semantic.min.css";
import "./styles/globals.css";
import CustomAmplifyAuthProvider from "./CustomAmplifyAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CampusFestHub App",
  description: "Explore and Share College Fests and events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomAmplifyAuthProvider>{children}</CustomAmplifyAuthProvider>
      </body>
    </html>
  );
}
