"use client";
import { useAuthenticator, Button, Heading, View } from "@aws-amplify/ui-react";
import Link from "next/link";

export default function Home() {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  function logOut() {
    signOut();
  }
  return (
    <div>
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
                <span>Logout</span>
              )}
            </div>
          </div>
        </nav>
      </div>
      Hello page
    </div>
  );
}
