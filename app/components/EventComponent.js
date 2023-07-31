"use client";
import React, { useState } from "react";
import { Icon, Dropdown, Button, Confirm, Popup } from "semantic-ui-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { RWebShare } from "react-web-share";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

import useIsTouchDevice from "../util/isMobileDevice";

function EventComponent({ event, fest, user, me }) {
  const isMobileDevice = useIsTouchDevice();

  const options = [
    { key: "publish", text: "Publish", value: 1 },
    { key: "unpublish", text: "Unpublish", value: 0 },
  ];

  const show = () => setOpenConfirm(true);

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }

  const onClickIsPublish = (event, data) => {
    setIsPublish(data.value);
    show();
  };

  return (
    <Link
      href={
        me
          ? `/me/fest/${fest.id}/event/${event.id}`
          : `/fests/${fest.id}/events/${event.id}`
      }
    >
      <div className="individual-event">
        <div className="event-meta">
          <div className="individual-event-header">
            <div className="college">
              <div className="heading-festname underline-link ">
                {event.eventName}
              </div>
            </div>
            <div className="college-logo"></div>
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
            <div className="action-container"></div>
          </div>
          <div className="share-button-container">
            {isMobileDevice && (
              <div className="share-button-option">
                <Popup
                  content="Share"
                  trigger={
                    <RWebShare
                      data={{
                        url: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.id}/events/${event.id}`,
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
                    url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.festId}/events/${event.id}`}
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
                    url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.festId}/events/${event.id}`}
                    title={event.eventName}
                  >
                    <TelegramIcon size={25} round />
                  </TelegramShareButton>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
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

// const FETCH_EVENTS_LIST = gql`
//   query ($festId: ID!) {
//     listOfEvent(festId: $festId) {
//       eventId
//       userId
//       eventName
//       eventStartDate
//       eventEndDate
//       eventMode
//       isPublished
//     }
//   }
// `;

// const FETCH_FESTS = gql`
//   {
//     listOfFest {
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

export default EventComponent;
