import React, { useState } from "react";
import {
  Grid,
  Icon,
  Dropdown,
  Button,
  Confirm,
  Popup,
} from "semantic-ui-react";
import Link from "next/link";
import Image from "next/image";
import { RWebShare } from "react-web-share";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";
import { useRouter } from "next/navigation";

import defaultImageSmall from "../../public/defaultImageSmall.png";
import useIsTouchDevice from "../util/isMobileDevice";

function FestComponent({ fest, me }) {
  const isMobileDevice = useIsTouchDevice();

  const router = useRouter();

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()]
      .join("/")
      .toString();
  }

  return (
    <Link href={me ? `/me/fest/${fest.id}` : `/fests/${fest.id}`}>
      <div className="individual-fest cursor-pointer-div">
        <div className="fest-meta">
          <div className="individual-fest-header">
            <div className="college">
              <div className="heading-festname underline-link">
                {fest.festName}
              </div>
              <div className="heading-collegename">
                <p>{fest.collegeName}</p>
              </div>
              {/*  */}
              <div className="individual-fest-location">
                <p className="individual-fest-text">
                  <Icon color="grey" name="map marker alternate" />
                  <span>
                    {fest.city}, {fest.state}
                  </span>
                </p>
              </div>
              {/*  */}
            </div>
            <div className="college-logo">
              <div
                className="college-logo-imagedemo"
                style={{ width: "104px", maxHeight: "300px" }}
              >
                {fest.imageUrlSmall ? (
                  <Image
                    src={`https://kecsnyitwurnjbomwuos.supabase.co/storage/v1/object/public/festbestbucket/${fest.imageUrlSmall}`}
                    alt={`${fest.collegeName} image logo`}
                    width="104"
                    height="100"
                    objectFit="cover"
                    position="fixed"
                  />
                ) : (
                  <Image
                    src={defaultImageSmall}
                    width="110"
                    height="110"
                    alt="default small image"
                    objectFit="contain"
                    position="fixed"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="individual-fest-details">
            {/* For Desktop individual-fest-details-container*/}
            <div className="individual-fest-details-container display-none-for-mobile">
              <div className="individual-fest-details-row">
                <div className="individual-fest-details-item">
                  <div className="item-heading">
                    <Icon
                      color="grey"
                      name="calendar alternate outline"
                      className="individual-fest-item-icon"
                    />
                    <span>Start date</span>
                  </div>
                  <div className="item-body">
                    <span>{convertDate(fest.festStartDate)}</span>
                  </div>
                </div>
                <div className="individual-fest-details-item">
                  <div className="item-heading">
                    <Icon
                      color="grey"
                      name="calendar alternate outline"
                      className="individual-fest-item-icon"
                    />
                    <span>End date</span>
                  </div>
                  <div className="item-body">
                    <span>{convertDate(fest.festEndDate)}</span>
                  </div>
                </div>
                <div className="individual-fest-details-item">
                  <div className="item-heading">
                    <Icon
                      color="grey"
                      name="calendar alternate outline"
                      className="globe"
                    />
                    <span>Event mode</span>
                  </div>
                  <div className="item-body">
                    <span>{fest.eventMode}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* For Desktop End individual-fest-details-container*/}

            {/* For Mobile individual-fest-details-container*/}
            <div className="individual-fest-details-container display-none-for-desktop">
              <div className="individual-fest-details-row">
                <div className="individual-fest-details-item">
                  <div className="item-heading">
                    <Icon
                      color="grey"
                      name="calendar alternate outline"
                      className="individual-fest-item-icon"
                    />
                    <span>Start date</span>
                  </div>
                  <div className="item-body">
                    <span>{convertDate(fest.festStartDate)}</span>
                  </div>
                </div>
                <div className="individual-fest-details-item">
                  <div className="item-heading">
                    <Icon
                      color="grey"
                      name="calendar alternate outline"
                      className="individual-fest-item-icon"
                    />
                    <span>End date</span>
                  </div>
                  <div className="item-body">
                    <span>{convertDate(fest.festEndDate)}</span>
                  </div>
                </div>
              </div>
              <div className="individual-fest-details-row">
                <div className="individual-fest-details-item">
                  <div className="item-heading">
                    <Icon
                      color="grey"
                      name="calendar alternate outline"
                      className="globe"
                    />
                    <span>Event mode</span>
                  </div>
                  <div className="item-body">
                    <span>{fest.eventMode}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* For Mobile End individual-fest-details-container*/}
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
                        text: fest.festDescription,
                        url: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.id}`,
                        title: fest.festName,
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
                    url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.id}`}
                    title={fest.festName}
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
                    url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.id}`}
                    title={fest.festName}
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

// const CHANGE_PUBLISH_FEST_STATUS = gql`
//   mutation ChangeThePublishFestStatus($ispublishfest: IsPublishFestInput!) {
//     changePublishFest(ispublishfest: $ispublishfest) {
//       msg
//       status
//     }
//   }
// `;

// const FETCH_FESTS = gql`
//   {
//     listOfFest {
//       id
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

export default FestComponent;
