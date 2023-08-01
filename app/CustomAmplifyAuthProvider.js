"use client";
import "@aws-amplify/ui-react/styles.css";
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
