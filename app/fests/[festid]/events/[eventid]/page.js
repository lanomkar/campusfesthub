import { getFest, getEvent } from "@/src/graphql/queries";
import awsExports from "@/src/aws-exports";
import { deserializeModel } from "@aws-amplify/datastore/ssr";
import { headers } from "next/headers";
import { API, Amplify, withSSRContext } from "aws-amplify";
import EventServerSideFetchComponent from "@/app/components/EventServerSideFetchComponent";
// import FestServerSideFetchComponent from "@/app/components/FestServerSideFetchComponent";

// import { gql } from "@apollo/client";
// import EventServerSideFetchComponent from "@/app/components/EventServerSideFetchComponent";

// import EventServerSideFetchComponent from "../../../../../components/EventServerSideFetchComponent";

Amplify.configure({ ...awsExports, ssr: true });
export async function generateMetadata({ params: { eventid } }) {
  // Fetch data based on params.id
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };
  const SSR = withSSRContext({ req });
  const eventData = await SSR.API.graphql({
    query: getEvent,
    authMode: "AWS_IAM",
    variables: { id: eventid },
  });
  if (eventData && eventData.data && eventData.data.getEvent) {
    return {
      title: eventData.data.getEvent.eventName,
      description: eventData.data.getEvent.descriptionForinnerHTML,
    };
  }
}
export default async function EventDetails({ params: { eventid } }) {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };
  const SSR = withSSRContext({ req });
  const eventData = await SSR.API.graphql({
    query: getEvent,
    authMode: "AWS_IAM",
    variables: { id: eventid },
  });
  console.log("FLKDSF ++> ", eventData);

  if (eventData && eventData.data && eventData.data.getEvent) {
    return (
      <>
        {/* <h2>{eventData.data.getEvent.festName}</h2> */}
        <EventServerSideFetchComponent eventState={eventData.data.getEvent} />
      </>
    );
  }
  return <h2>NOT FOUND</h2>;

  const eventId = params.eventid;
  if (!eventId) {
    return <h2>No data found</h2>;
  }
  return <EventServerSideFetchComponent eventId={eventId} />;
}
