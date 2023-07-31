"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Divider, Grid, Icon, Confirm, Button } from "semantic-ui-react";
// import { useMutation, gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { API, Amplify, Storage, graphqlOperation } from "aws-amplify";
import awsExports from "../../../../../../src/aws-exports";
import { getEvent } from "../../../../../../src/graphql/queries";
import { deleteEvent } from "../../../../../../src/graphql/mutations";
// import { AuthContext } from "../../../../../../context/auth";

import defaultImage from "../../../../../../public/defaultImageBanner.jpg";

import EventDetailComponent from "../../../../../components/EventDetailComponent";

export default function Event({ params }) {
  Amplify.configure(awsExports);
  const { user } = useAuthenticator((context) => [context.user]);
  //   const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const [openDeleteEventConfirm, setOpenDeleteEventConfirm] = useState(false);

  const showDeleteEvent = () => setOpenDeleteEventConfirm(true);

  const [event, setEvent] = useState({});

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const eventData = await API.graphql({
        query: getEvent,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { id: params.eventid },
      });
      const event = eventData.data.getEvent;
      console.log("event ", event);
      setEvent(event);
    } catch (error) {
      console.log("error on fetching events", error);
    }
  };

  const handleDeleteEventConfirm = async () => {
    const deleteEventData = await API.graphql({
      query: deleteEvent,
      variables: {
        input: {
          id: params.eventid,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setOpenDeleteEventConfirm(false);
  };

  const handleDeleteEventCancel = () => setOpenDeleteEventConfirm(false);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "20%" }}>Empty</div>
        <div style={{ flex: "60%" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              border: "1.5px dashed #000",
              borderRadius: "5px",
              minHeight: "200px",
              maxHeight: "350px",
            }}
          >
            {/* <Image src="/defaultImageBanner.jpg" alt="default banner image" /> */}
            {event && event.imageUrlBanner ? (
              <Image
                src={`https://kecsnyitwurnjbomwuos.supabase.co/storage/v1/object/public/festbestbucket/${event.imageUrlBanner}`}
                alt="Image banner image"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Image
                src={defaultImage}
                alt="default banner image"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>

          <div className="individual-fest individual-fest-container">
            {/* user={user} */}
            <EventDetailComponent eventprops={event} me={true} />
            <Divider />
            {event && user && (
              <>
                <div className="fest-control-options-container">
                  <div className="fest-control-option">
                    <button className="ui red button" onClick={showDeleteEvent}>
                      <Icon name="trash alternate outline" />
                      Delete
                    </button>
                    <Confirm
                      open={openDeleteEventConfirm}
                      content={
                        "Do you want to delete " + event.eventName + " event"
                      }
                      onCancel={handleDeleteEventCancel}
                      onConfirm={handleDeleteEventConfirm}
                    />
                  </div>
                </div>
                <Divider />
              </>
            )}

            <div className="fest-detail-description">
              <div className="fest-detail-description-header">About Event:</div>
              <Divider />
              {event.descriptionForinnerHTML && (
                <div
                  className="fest-detail-description-text"
                  dangerouslySetInnerHTML={{
                    __html: JSON.parse(event.descriptionForinnerHTML),
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
        <div style={{ flex: "20%" }}>Empty</div>
      </div>
      <br />
    </div>
  );
}
