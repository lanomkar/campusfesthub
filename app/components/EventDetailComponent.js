import React, { useState } from "react";
import {
  Grid,
  Icon,
  Dropdown,
  Button,
  Confirm,
  Popup,
  Divider,
} from "semantic-ui-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { useMutation, gql, useQuery } from "@apollo/client";

import { RWebShare } from "react-web-share";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

import useIsTouchDevice from "../util/isMobileDevice";

function EventDetailComponent({ eventprops: event, user, me }) {
  const isMobileDevice = useIsTouchDevice();
  // const [event, setEvent] = useState(eventprops);
  const options = [
    { key: "publish", text: "Publish", value: 1 },
    { key: "unpublish", text: "Unpublish", value: 0 },
  ];

  const router = useRouter();

  const [openConfirm, setOpenConfirm] = useState(false);

  const [isPublish, setIsPublish] = useState(0);

  const show = () => setOpenConfirm(true);

  // const handleConfirm = () => {
  //   SubmitChangePublishStatus({
  //     variables: {
  //       ispublishevent: {
  //         eventId: Number(event.id),
  //         isPublished: Number(isPublish),
  //       },
  //     },
  //     onCompleted: (data) => {},
  //     errorPolicy: "all", // errorPolicy='all' =>  do not show error popup and error in console log
  //   });
  // };

  const handleCancel = () => setOpenConfirm(false);

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }

  // const onClickIsPublish = (event, data) => {
  //   setIsPublish(data.value);
  //   show();
  // };

  return (
    <>
      <div className="event-meta">
        <div className="individual-event-header">
          <div className="college">
            <div className="heading-festname">
              <h2 className="view-detail-button">{event.eventName}</h2>
            </div>
          </div>
        </div>
        <div className="individual-event-details">
          {/* For Desktop individual-event-details-container*/}
          <div className="individual-event-details-container display-none-for-mobile">
            <div className="individual-event-details-row">
              <div className="individual-event-details-item">
                <div className="item-heading">
                  <Icon
                    color="grey"
                    name="calendar alternate outline"
                    className="individual-event-item-icon"
                  />
                  <span>Start date</span>
                </div>
                <div className="item-body">
                  <span>{convertDate(event.eventStartDate)}</span>
                </div>
              </div>
              <div className="individual-event-details-item">
                <div className="item-heading">
                  <Icon
                    color="grey"
                    name="calendar alternate outline"
                    className="individual-event-item-icon"
                  />
                  <span>End date</span>
                </div>
                <div className="item-body">
                  <span>{convertDate(event.eventEndDate)}</span>
                </div>
              </div>
              <div className="individual-event-details-item">
                <div className="item-heading">
                  <Icon
                    color="grey"
                    name="calendar alternate outline"
                    className="globe"
                  />
                  <span>Event mode</span>
                </div>
                <div className="item-body">
                  <span>{event.eventMode}</span>
                </div>
              </div>
            </div>
          </div>
          {/* For Desktop End individual-event-details-container*/}

          {/* For Mobile individual-event-details-container*/}
          <div className="individual-event-details-container display-none-for-desktop">
            <div className="individual-event-details-row">
              <div className="individual-event-details-item">
                <div className="item-heading">
                  <Icon
                    color="grey"
                    name="calendar alternate outline"
                    className="individual-event-item-icon"
                  />
                  <span>Start date</span>
                </div>
                <div className="item-body">
                  <span>{convertDate(event.eventStartDate)}</span>
                </div>
              </div>
              <div className="individual-event-details-item">
                <div className="item-heading">
                  <Icon
                    color="grey"
                    name="calendar alternate outline"
                    className="individual-event-item-icon"
                  />
                  <span>End date</span>
                </div>
                <div className="item-body">
                  <span>{convertDate(event.eventEndDate)}</span>
                </div>
              </div>
            </div>
            <div className="individual-event-details-row">
              <div className="individual-event-details-item">
                <div className="item-heading">
                  <Icon
                    color="grey"
                    name="calendar alternate outline"
                    className="globe"
                  />
                  <span>Event mode</span>
                </div>
                <div className="item-body">
                  <span>{event.eventMode}</span>
                </div>
              </div>
            </div>
          </div>
          {/* For Mobile End individual-event-details-container*/}
        </div>
      </div>
      <div className="button-container">
        <div className="tags-container">
          <div className="action-container">
            {/* {me && event && user && event.userId == user.userId && (
              <>
                <Button.Group color={event.isPublished ? "teal" : "orange"}>
                  <Button>{event.isPublished ? "Publish" : "Unpublish"}</Button>
                  <Dropdown
                    className="button icon"
                    floating
                    options={options}
                    trigger={<></>}
                    onChange={(e, data) => onClickIsPublish(e, data)}
                  />
                </Button.Group>
                <Confirm
                  open={openConfirm}
                  content={
                    "Do you want to " +
                    (isPublish ? "publish " : "unpublish ") +
                    event.eventName +
                    " event"
                  }
                  onCancel={handleCancel}
                  onConfirm={handleConfirm}
                />
              </>
            )} */}
          </div>
        </div>

        <div className="share-button-container">
          {isMobileDevice && (
            <div className="share-button-option">
              <Popup
                content="Share"
                trigger={
                  <RWebShare
                    data={{
                      url: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${event.festID}/events/${event.id}`,
                      title: event.eventName,
                    }}
                    onClick={() => {}}
                  >
                    <Icon color="grey" name="share alternate" />
                  </RWebShare>
                }
              />
            </div>
          )}

          <div className="share-button-option">
            <Popup
              content="Share"
              trigger={
                <WhatsappShareButton
                  url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${event.festID}/events/${event.id}`}
                  title={event.eventName}
                  separator=":: "
                >
                  <WhatsappIcon size={25} round />
                </WhatsappShareButton>
              }
            />
          </div>
          <div className="share-button-option">
            <Popup
              content="Share"
              trigger={
                <TelegramShareButton
                  url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${event.festID}/events/${event.id}`}
                  title={event.eventName}
                >
                  <TelegramIcon size={25} round />
                </TelegramShareButton>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

// const CHANGE_PUBLISH_EVENT_STATUS = gql`
//   mutation ChangeThePublishEventStatus($ispublishevent: IsPublishEventInput!) {
//     changePublishEvent(ispublishevent: $ispublishevent) {
//       msg
//       status
//     }
//   }
// `;

// const FETCH_FEST_DETAILS = gql`
//   query ($festId: ID!) {
//     detailsOfFest(festId: $festId) {
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
//     }
//   }
// `;

export default EventDetailComponent;
