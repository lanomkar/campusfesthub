import { getFest, listFests } from "@/src/graphql/queries";
import awsExports from "@/src/aws-exports";
import { deserializeModel } from "@aws-amplify/datastore/ssr";
import { headers } from "next/headers";
import { API, Amplify, withSSRContext } from "aws-amplify";
import FestServerSideFetchComponent from "@/app/components/FestServerSideFetchComponent";

Amplify.configure({ ...awsExports, ssr: true });

export async function generateMetadata({ params: { festid } }) {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };
  const SSR = withSSRContext({ req });
  const festData = await SSR.API.graphql({
    query: getFest,
    authMode: "AWS_IAM",
    variables: { id: festid },
  });
  if (festData && festData.data && festData.data.getFest) {
    return {
      title: festData.data.getFest.festName,
      description: festData.data.getFest.festDescription,
    };
  }
}

export default async function FestWithEventList({ params: { festid } }) {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };
  const SSR = withSSRContext({ req });
  const festData = await SSR.API.graphql({
    query: getFest,
    authMode: "AWS_IAM",
    variables: { id: festid },
  });

  if (festData && festData.data && festData.data.getFest) {
    return (
      <>
        <div style={{ marginBottom: "10px" }}></div>
        <FestServerSideFetchComponent festDetails={festData.data.getFest} />
      </>
    );
  }
  return (
    <h3 align="center" style={{ color: "red", padding: "10px" }}>
      Something went wrong when fetching data
    </h3>
  );
}
