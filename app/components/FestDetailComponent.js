"use client";
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

import Image from "next/image";

import defaultImageSmall from "../../public/defaultImageSmall.png";

import { RWebShare } from "react-web-share";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

import useIsTouchDevice from "../util/isMobileDevice";

function FestDetailComponent({ festprops: fest, events, user, me }) {
  // console.log("FESTPROPS", festprops);
  const isMobileDevice = useIsTouchDevice();
  const options = [
    { key: "publish", text: "Publish", value: 1 },
    { key: "unpublish", text: "Unpublish", value: 0 },
  ];

  const router = useRouter();

  const show = () => setOpenConfirm(true);

  const handleConfirm = () => {};

  const handleCancel = () => setOpenConfirm(false);

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
    <>
      <div className="fest-meta">
        <div className="individual-fest-header">
          <div className="college">
            <div className="heading-festname">
              {/* <Link
                href={`/me/fest/${fest.festId}`}
                className="view-detail-button"
              > */}
              {fest.festName}
              {/* </Link> */}
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
          <div className="action-container">
            {me && user && fest.userId == user.userId && (
              <>
                <Button.Group color={fest.isPublished ? "teal" : "orange"}>
                  <Button>{fest.isPublished ? "Publish" : "Unpublish"}</Button>
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
                    fest.festName +
                    " fest"
                  }
                  onCancel={handleCancel}
                  onConfirm={handleConfirm}
                />
              </>
            )}
          </div>
        </div>
        {/* <div className="share-button-container">
          <div>
            <Popup
              content="Share"
              trigger={
                <Icon
                  color="grey"
                  name="share alternate"
                  onClick={() => }
                />
              }
            />
          </div>
        </div> */}
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

// const CHANGE_PUBLISH_FEST_STATUS = gql`
//   mutation ChangeThePublishFestStatus($ispublishfest: IsPublishFestInput!) {
//     changePublishFest(ispublishfest: $ispublishfest) {
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

export default FestDetailComponent;
