"use client";
import React, { useState, useEffect } from "react";

import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import "semantic-ui-css/semantic.min.css";

export default function HomeLayout({
  children, // will be a page or nested layout
}) {
  const router = useRouter();
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user,
  ]);

  useEffect(() => {
    if (route === "authenticated") {
      console.log("USER IS AUTHENTICATED");
    } else {
    }
  }, [route]);
  return <section>{children}</section>;
}
