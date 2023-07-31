"use client";
import Image from "next/image";
import { Divider, Grid, Icon, Confirm, Button } from "semantic-ui-react";

import defaultImage from "../../public/defaultImageBanner.jpg";

// import { AuthContext } from "../context/auth";
import FestDetailComponent from "./FestDetailComponent";
import EventComponent from "./EventComponent";

function FestServerSideFetchComponent({ festDetails }) {
  if (festDetails) {
    const fest = festDetails;
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
            {/* <Image src="/defaultImageBanner.jpg" alt="default banner image" /> */}
            {fest && fest.imageUrlBanner ? (
              <Image
                src={`https://kecsnyitwurnjbomwuos.supabase.co/storage/v1/object/public/festbestbucket/${fest.imageUrlBanner}`}
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
            <FestDetailComponent
              festprops={fest}
              me={false}
              events={fest && fest.events && fest.events.items}
            />
            <Divider />

            <div className="fest-detail-description">
              <div className="fest-detail-description-header">About Fest</div>
              <div className="fest-detail-description-text">
                {fest.festDescription}
              </div>
            </div>
          </div>

          <br />
          {/* Create Event Section End */}
          {fest &&
            fest.events &&
            // user={user}
            fest.events.items.map((event) => {
              //
              return (
                <EventComponent
                  key={event.id}
                  fest={fest}
                  event={event}
                  me={false}
                />
              );
            })}
        </div>
        <br />
      </>
    );
  }

  return null;
}

export default FestServerSideFetchComponent;

// const FETCH_FESTS_DETAILS_AND_EVENTS_LIST = gql`
//   query ($festId: ID!) {
//     festDetailsWithEventList(festId: $festId) {
//       festId
//       userId
//       festName
//       collegeName
//       state
//       city
//       country
//       festStartDate
//       festEndDate
//       eventMode
//       isPublished
//       festDescription
//       imageUrlSmall
//       imageUrlBanner
//       event {
//         eventId
//         userId
//         eventName
//         eventStartDate
//         eventEndDate
//         eventMode
//         isPublished
//       }
//     }
//   }
// `;
