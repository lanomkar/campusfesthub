"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API, Amplify } from "aws-amplify";

import { listFests } from "@/src/graphql/queries";

import awsExports from "@/src/aws-exports";
import FestComponent from "@/app/components/FestComponent";
export default function FestListPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  Amplify.configure(awsExports);
  const router = useRouter();
  const [fests, setFests] = useState([]);

  useEffect(() => {
    fetchFests();
  }, []);

  const fetchFests = async () => {
    setLoading(true);
    try {
      const festData = await API.graphql({
        query: listFests,
        authMode: "AWS_IAM",
      });
      const festList = festData.data.listFests.items;
      setError(null);
      setFests(festList);
    } catch (error) {
      console.log("error on fetching fest lists", error);
      setError("error on fetching fest lists");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="leftSideBar"></div>
        <div style={{ flex: "60%" }}>
          <div className="centerScreen">
            <div>
              {error && error.length > 0 && (
                <h3 align="center" style={{ color: "red", padding: "10px" }}>
                  {error}
                </h3>
              )}
            </div>
            <div style={{ marginBottom: "10px" }}></div>
            {fests &&
              fests.map((fest) => {
                return <FestComponent fest={fest} key={fest.id} me={false} />;
              })}
          </div>
        </div>
        <div className="rightSideBar"></div>
      </div>
    </div>
  );
}
