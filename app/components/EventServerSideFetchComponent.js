"use client";
import React,   from "react";
import Image from "next/image";
import { Divider, } from "semantic-ui-react";

import defaultImage from "@/public/defaultImageBanner.jpg";

import EventDetailComponent from "@/app/components/EventDetailComponent";

function EventServerSideFetchComponent({ eventState }) {
  if (eventState) {
    const event = eventState;
    return (
      <>
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
            <EventDetailComponent eventprops={event} me={false} />

            <Divider />

            <div className="fest-detail-description">
              <div className="fest-detail-description-header">About Event:</div>
              <Divider />
              <div
                className="fest-detail-description-text"
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(event.descriptionForinnerHTML),
                }}
              ></div>
            </div>
          </div>
        </div>
        <br />
      </>
    );
  }

  return null;
}

export default EventServerSideFetchComponent;
