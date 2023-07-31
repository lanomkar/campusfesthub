"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  API,
  Amplify,
  Storage,
  graphqlOperation,
  AuthModeStrategyType,
} from "aws-amplify";
import Link from "next/link";
import {
  Input,
  Button,
  Icon,
  Grid,
  Dropdown,
  Select,
  TextArea,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import { listFests } from "../../src/graphql/queries";

import awsExports from "../../src/aws-exports";
import FestComponent from "@/app/components/FestComponent";
export default function FestListPage() {
  //   Amplify.configure({
  //     ...awsExports,
  //     DataStore: {
  //       authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  //     },
  //   });
  Amplify.configure(awsExports);
  const router = useRouter();
  const [fests, setFests] = useState([]);

  useEffect(() => {
    fetchFests();
  }, []);

  const fetchFests = async () => {
    try {
      //   const festData =  await API.graphql({ query: listFests });
      const festData = await API.graphql({
        query: listFests,
        authMode: "AWS_IAM",
      });
      const festList = festData.data.listFests.items;
      console.log("fest list", festList);
      setFests(festList);
    } catch (error) {
      console.log("error on fetching songs", error);
    }
  };
  return (
    <div>
      <div>
        <h2>Fest Lists</h2>
        <div>
          <button onClick={() => router.push("/me/createFest")}>
            Create Fest
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "20%" }}>Filters</div>
        <div style={{ flex: "60%" }}>
          <div style={{ marginTop: "20px" }}>
            {fests &&
              fests.map((fest) => {
                return <FestComponent fest={fest} key={fest.id} me={false} />;
              })}
          </div>
        </div>
        <div style={{ flex: "20%" }}>Hello</div>
      </div>
    </div>
  );
}
