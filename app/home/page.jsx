"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import awsExports from "@/src/aws-exports";
import collegestudents from "@/public/collegestudents.jpg";
import {
  Input,
  Button,
  Icon,
  Dropdown,
  Select,
  TextArea,
} from "semantic-ui-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  Amplify.configure(awsExports);
  const router = useRouter();

  const handleFindFest = () => {
    router.push("/fests");
  };

  const handleCreateAnAccount = () => {
    router.push("/auth");
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flex: "50%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2 style={{ padding: "0px", margin: "0px", marginBottom: "7px" }}>
            Unlock the World of College Fests and Events
          </h2>
          <h3 style={{ padding: "0px", margin: "0px", textAlign: "right" }}>
            - Welcome to CampusFestHub!
          </h3>
          <div
            style={{
              marginTop: "40px",
            }}
          >
            <Button
              style={{ marginRight: "11px" }}
              type="button"
              color="teal"
              onClick={handleFindFest}
            >
              Find Fests
            </Button>
            <Button
              basic
              type="button"
              color="teal"
              onClick={handleCreateAnAccount}
            >
              Create An Account
            </Button>
          </div>
        </div>
        <div style={{ display: "block", flex: "50%" }}>
          <div
            style={{ width: "100%", minHeight: "600px", maxHeight: "600px" }}
          >
            <Image
              src={collegestudents}
              alt="college students image"
              width="550"
              height="550"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
