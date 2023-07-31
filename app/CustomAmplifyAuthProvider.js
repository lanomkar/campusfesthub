"use client";
import festStyles from "@/app/styles/Fest.module.css";
import { Authenticator } from "@aws-amplify/ui-react";
export default function CustomAmplifyAuthProvider({ children, auth }) {
  return (
    <html>
      <body>
        <Authenticator.Provider>{children}</Authenticator.Provider>
      </body>
    </html>
  );
}
