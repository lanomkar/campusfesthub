"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import awsExports from "@/src/aws-exports";
import collegestudents from "@/public/collegestudents.jpg";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/Home.module.css";

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
      <div className={styles.wrapper}>
        <div className={styles.homeContainer}>
          <h2 className={styles.content}>
            Unlock the World of College Fests and Events
          </h2>
          <h3 className={styles.contentTag}>- Welcome to CampusFestHub!</h3>
          <div className={styles.btngroups}>
            <Button
              className={styles.btnStyle}
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
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainerDiv}>
            <Image
              src={collegestudents}
              className={styles.imageClass}
              alt="college students image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
