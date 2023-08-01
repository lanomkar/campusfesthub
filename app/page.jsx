"use client";
import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "@/src/aws-exports";
import { useRouter } from "next/navigation";

export default function Home() {
  Amplify.configure(awsExports);
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);

  return (
    <div className="main-loading-div">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h4>Loading...</h4>
    </div>
  );
}
