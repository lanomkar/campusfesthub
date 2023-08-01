"use client";
import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

import awsExports from "../../src/aws-exports";
Amplify.configure(awsExports);
export default function Auth() {
  const router = useRouter();
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  useEffect(() => {
    if (route === "authenticated") {
      router.push("/me/fests");
    } else {
      console.log("not authenticated");
    }
  }, [route]);
  return (
    <div style={{ marginTop: "16px" }}>
      <Authenticator />
    </div>
  );
}
