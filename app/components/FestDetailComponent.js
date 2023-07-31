"use client";
import { Icon, Dropdown, Button, Confirm, Popup } from "semantic-ui-react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import defaultImageSmall from "@/public/defaultImageSmall.png";

import { RWebShare } from "react-web-share";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

import useIsTouchDevice from "@/app/util/isMobileDevice";

function FestDetailComponent({ festprops: fest, events, user, me }) {
  const isMobileDevice = useIsTouchDevice();
  const options = [
    { key: "publish", text: "Publish", value: 1 },
    { key: "unpublish", text: "Unpublish", value: 0 },
  ];

  const router = useRouter();

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }

  return (
    <>
      <div className="fest-meta">
        <div className="individual-fest-header">
          <div className="college">
            <div className="heading-festname">{fest.festName}</div>
            <div className="heading-collegename">
              <p>{fest.collegeName}</p>
            </div>
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
                  alt="default small image"
                  width="104"
                  height="100"
                  objectFit="cover"
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
                      url: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.festId}`,
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
                  url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.festId}`}
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
                  url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/fests/${fest.festId}`}
                  title={fest.festName}
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

export default FestDetailComponent;
