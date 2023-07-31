import { getFest, getEvent } from "@/src/graphql/queries";
import awsExports from "@/src/aws-exports";
import { headers } from "next/headers";
import { Amplify, withSSRContext } from "aws-amplify";
import EventServerSideFetchComponent from "@/app/components/EventServerSideFetchComponent";

Amplify.configure({ ...awsExports, ssr: true });
export async function generateMetadata({ params: { eventid } }) {
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

  if (eventData && eventData.data && eventData.data.getEvent) {
    return (
      <>
        <div style={{ marginBottom: "10px" }}></div>
        <EventServerSideFetchComponent eventState={eventData.data.getEvent} />
      </>
    );
  }
  return <h2>NOT FOUND</h2>;
}
