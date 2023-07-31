"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API, Amplify, Storage, graphqlOperation } from "aws-amplify";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import { listFests } from "@/src/graphql/queries";
import awsExports from "@/src/aws-exports";
import FestComponent from "@/app/components/FestComponent";
import festStyles from "@/app/styles/Fest.module.css";
export default function FestListsPage() {
  Amplify.configure(awsExports);
  const router = useRouter();
  const [fests, setFests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchFests();
  }, []);

  const fetchFests = async () => {
    try {
      const festData = await API.graphql({
        query: listFests,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const festList = festData.data.listFests.items;
      setFests(festList);
      setError(null);
    } catch (error) {
      console.log("Error on fetching  listFests API", error);
      setFests([]);
      setError("Error on loading fests");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ flex: "20%" }}>Filters</div>
        <div style={{ flex: "60%" }}>
          {error && error.length > 0 && <h3 align="center">{error}</h3>}
          {!error && (
            <div className={festStyles.createNewFestContainer}>
              <Button
                color="teal"
                onClick={() => router.push("/me/createFest")}
              >
                Create New Fest
              </Button>
            </div>
          )}
          <div style={{ marginTop: "10px" }}>
            {fests &&
              fests.map((fest) => {
                return <FestComponent fest={fest} key={fest.id} me={true} />;
              })}
          </div>
        </div>
        <div style={{ flex: "20%" }}>Hello</div>
      </div>
    </div>
  );
}
