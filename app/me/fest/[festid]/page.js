"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API, Amplify, Storage, graphqlOperation } from "aws-amplify";
import { Button, Icon, Divider, Confirm } from "semantic-ui-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getFest } from "@/src/graphql/queries";
import { deleteFest } from "@/src/graphql/mutations";
import awsExports from "@/src/aws-exports";
import defaultImage from "@/public/defaultImageBanner.jpg";
import FestDetailComponent from "@/app/components/FestDetailComponent";
import EventComponent from "@/app/components/EventComponent";

export default function FestDetailsPage({ params }) {
  Amplify.configure(awsExports);
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]);
  const [fests, setFests] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openDeleteFestConfirm, setOpenDeleteFestConfirm] = useState(false);

  const showDeleteFest = () => setOpenDeleteFestConfirm(true);

  const handleDeleteFestConfirm = async () => {
    setLoading(true);
    try {
      const deleteFestData = await API.graphql({
        query: deleteFest,
        variables: {
          input: {
            id: params.festid,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      router.push("/me/fests");
    } catch (error) {
      console.log("error on deleting fest", error);
      setError("Error on deleting fest");
    } finally {
      setOpenDeleteFestConfirm(false);
      setLoading(false);
    }
  };

  const handleDeleteFestCancel = () => setOpenDeleteFestConfirm(false);

  useEffect(() => {
    fetchFests();
  }, []);

  const fetchFests = async () => {
    setLoading(true);
    try {
      const festData = await API.graphql({
        query: getFest,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { id: params.festid },
      });
      const festList = festData.data.getFest;
      setFests(festList);
      setError(null);
    } catch (error) {
      console.log("error on fetching fests", error);
      setError("Error on fetching fest");
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="leftSideBar"></div>
        <div className="centerScreen">
          <>
            <div>
              {error && error.length > 0 && (
                <h3 align="center" style={{ color: "red", padding: "10px" }}>
                  {error}
                </h3>
              )}
            </div>
            <div className="fest-detail-container">
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
                {fests && fests.imageUrlBanner ? (
                  <Image
                    src={`https://kecsnyitwurnjbomwuos.supabase.co/storage/v1/object/public/festbestbucket/${fests.imageUrlBanner}`}
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
                {/* events={eventsData && eventsData.listOfEvent}   */}
                {/* user={user} */}
                <FestDetailComponent festprops={fests} me={true} />
                <Divider />
                {fests && user && (
                  <>
                    <div className="fest-control-options-container">
                      <div className="fest-control-option">
                        <button
                          className="ui red button"
                          onClick={showDeleteFest}
                        >
                          <Icon name="trash alternate outline" />
                          Delete
                        </button>
                        <Confirm
                          open={openDeleteFestConfirm}
                          content={
                            "Do you want to delete " + fests.festName + " fest"
                          }
                          onCancel={handleDeleteFestCancel}
                          onConfirm={handleDeleteFestConfirm}
                        />
                      </div>
                    </div>
                    <Divider />
                  </>
                )}

                <div className="fest-detail-description">
                  <div className="fest-detail-description-header">
                    About Fest
                  </div>
                  <div className="fest-detail-description-text">
                    {fests.festDescription}
                  </div>
                </div>
              </div>
              {/* Create Event Section Start */}
              <div style={{ marginBottom: "20px" }}>
                <div className="fest-detail-create-event-section">
                  <Link href={`/me/fest/${fests.id}/createevent`}>
                    <Button color="teal">Create New Event</Button>
                  </Link>
                </div>
              </div>
              <br />
              {/* Create Event Section End */}
              {/* user={user} */}
              {fests.events &&
                fests.events.items.map((event) => {
                  return (
                    <EventComponent event={event} fest={fests} me={true} />
                  );
                })}
            </div>
            <br />
          </>
        </div>
        <div className="rightSideBar"></div>
      </div>
    </div>
  );
}
