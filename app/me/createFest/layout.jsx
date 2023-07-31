"use client";
import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";

import Link from "next/link";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import "semantic-ui-css/semantic.min.css";

import awsExports from "../../../src/aws-exports";
export default function MeLayout({
  children, // will be a page or nested layout
}) {
  Amplify.configure(awsExports);
  const router = useRouter();
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  return <section>{children}</section>;
}
