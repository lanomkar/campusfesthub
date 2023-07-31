"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import "semantic-ui-css/semantic.min.css";

export default function MeLayout({
  children, // will be a page or nested layout
}) {
  const router = useRouter();
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  useEffect(() => {
    if (route === "authenticated") {
    } else {
      router.push("/auth");
    }
  }, [route]);
  return (
    <section>
      <div>
        <nav>
          <div>
            <div>Logo</div>
            <div>
              {route !== "authenticated" ? (
                <Link href="/auth">
                  <span>Signin/Signup</span>
                </Link>
              ) : (
                <span onClick={signOut}>Logout</span>
              )}
            </div>
          </div>
        </nav>
      </div>

      {children}
    </section>
  );
}
