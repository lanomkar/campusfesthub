"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Icon, Input, Select } from "semantic-ui-react";
import { useQuill } from "react-quilljs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DatePicker from "react-datepicker";
import moment from "moment";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";
import { API, Amplify } from "aws-amplify";
import "react-datepicker/dist/react-datepicker.css";

import { createEvent } from "@/src/graphql/mutations";

import styles from "@/app/styles/Input.module.css";
import createEventStyles from "@/app/styles/CreateEvent.module.css";

import defaultImage from "@/public/defaultImageBanner.jpg";

import "quill/dist/quill.snow.css"; // Add css for snow theme

var formats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
  // 'image'
  // 'video'
];
const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [
      { align: null },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};
import awsExports from "@/src/aws-exports";
export default function CreateEvent({ params }) {
  Amplify.configure(awsExports);
  const router = useRouter();
  const festid = params.festid;

  // const [eventName, setEventName] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [imageBanner, setImageBanner] = useState(null);
  const [descriptionForinnerHTML, setDescriptionForinnerHTML] = useState("");
  const [descriptionForEditting, setDescriptionForEditting] = useState("");

  const [eventObject, setEventObject] = useState({
    id: uuid(),
    eventName: "",
    eventStartDate: new Date(),
    eventEndDate: new Date(),
    eventMode: "",
    isPublished: 1,
    imageUrlBanner: "",
  });

  const fileBannerImage = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const eventModeOptions = [
    { key: "Offline", value: "Offline", text: "Offline" },
    { key: "Online", value: "Online", text: "Online" },
    { key: "Both", value: "Both", text: "Both" },
  ];

  const { quill, quillRef } = useQuill({
    formats: formats,
    modules: modules,
  });

  const handleEventModeChange = (event, data) => {
    setEventObject({ ...eventObject, eventMode: data.value });
  };

  const formatFilename = (filename) => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      let filepathBannerImage = "";

      if (imageBanner) {
        let filenameBannerImage = formatFilename(imageBanner.name);

        let imageBannerMimetype = imageBanner.type;

        let { data, error } = await supabase.storage
          .from("festbestbucket")
          .upload("public/" + filenameBannerImage, imageBanner, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageBannerMimetype,
          });

        filepathBannerImage = data.path;
      }

      let myInputObj = {
        id: uuid(),
        eventName: eventObject.eventName,
        eventStartDate: eventObject.eventStartDate,
        eventEndDate: eventObject.eventEndDate,
        descriptionForinnerHTML: descriptionForinnerHTML,
        descriptionForEditting: descriptionForEditting,
        eventMode: eventObject.eventMode,
        isPublished: 1,
        imageUrlBanner: filepathBannerImage,
        festID: festid,
      };

      const eventData = await API.graphql({
        query: createEvent,
        variables: {
          input: myInputObj,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const eventCreated = eventData.data.createEvent;
      router.push(`/me/fest/${params.festid}`);
      setError(null);
    } catch (error) {
      console.log("error on creating event", error);
      setError("Error on creating fest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        let stringifyGetContents = JSON.stringify(quill.getContents());
        setDescriptionForEditting(stringifyGetContents);

        let stringifyInnerHTML = JSON.stringify(quill.root.innerHTML);
        setDescriptionForinnerHTML(stringifyInnerHTML);
      });
    }
  }, [quill]);

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
          <div>
            <div>
              {error && error.length > 0 && (
                <h3 align="center" style={{ color: "red", padding: "10px" }}>
                  {error}
                </h3>
              )}
            </div>
            <div style={{ marginTop: "10px" }}>
              {/* ---------Banner Image Start------------ */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  border: "1.5px dashed #000",
                  borderRadius: "5px",
                }}
              >
                {imageBanner ? (
                  <img
                    style={{ width: "100%", maxHeight: "290px" }}
                    src={imageBanner ? URL.createObjectURL(imageBanner) : null}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      minHeight: "200px",
                      maxHeight: "350px",
                    }}
                  >
                    <Image
                      src={defaultImage}
                      alt="default banner image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div style={{ position: "absolute", right: "0", top: "0" }}>
                  <Button
                    type="button"
                    color="teal"
                    circular
                    icon="close"
                    onClick={() => {
                      setImageBanner(null);
                      if (fileBannerImage.current) {
                        fileBannerImage.current.value = "";
                        fileBannerImage.current.type = "text";
                        fileBannerImage.current.type = "file";
                      }
                    }}
                  />
                </div>

                <div style={{ position: "absolute", right: "0", bottom: "0" }}>
                  <Button
                    type="button"
                    color="teal"
                    icon
                    labelPosition="left"
                    onClick={() => fileBannerImage.current.click()}
                  >
                    <Icon name="file" />
                    Upload a file
                  </Button>
                  <input
                    ref={fileBannerImage}
                    type="file"
                    hidden
                    onChange={(e) => setImageBanner(e.target.files[0])}
                  />
                </div>
              </div>
              {/* ------------Banner Image End------- */}
            </div>
            <div className={createEventStyles.createEventDetailsWrapper}>
              <div>
                <div className={createEventStyles.eventNameLabelDiv}>
                  <label htmlFor="eventName">Event Name:</label>
                </div>
                <div className={createEventStyles.eventNameInputDiv}>
                  <Input
                    className={styles.inputbutton}
                    fluid
                    onChange={(e) =>
                      setEventObject({
                        ...eventObject,
                        eventName: e.target.value,
                      })
                    }
                    placeholder="Enter Event Name"
                    id="eventName"
                    name="eventName"
                  />
                  {eventNameError.length > 0 && (
                    <p style={{ color: "red" }}>{eventNameError}</p>
                  )}
                </div>
              </div>
              <div className={createEventStyles.datesRangeDiv}>
                <div className={createEventStyles.startDateDiv}>
                  <div className={createEventStyles.eventStartDateLabelDiv}>
                    <label htmlFor="eventStartDate">Start Date:</label>
                  </div>
                  <div className={createEventStyles.startDateInputDiv}>
                    <DatePicker
                      selected={eventObject.eventStartDate}
                      onChange={(date) =>
                        setEventObject({ ...eventObject, eventStartDate: date })
                      }
                      className={styles.react_datepickerCustom}
                    />
                  </div>
                </div>
                {/* Event Start Date End */}
                {/* Event End Date Start */}
                <div className={createEventStyles.endDateDiv}>
                  <div className={createEventStyles.eventEndDateLabelDiv}>
                    <label htmlFor="eventEndDate">End Date:</label>
                  </div>
                  <div className={createEventStyles.endDateInputDiv}>
                    <DatePicker
                      selected={eventObject.eventEndDate}
                      className={styles.react_datepickerCustom}
                      onChange={(date) =>
                        setEventObject({ ...eventObject, eventEndDate: date })
                      }
                      minDate={eventObject.eventStartDate}
                    />
                  </div>
                </div>

                {/* Event End Date End */}
              </div>

              <div>
                <div className={createEventStyles.eventModeLabelDiv}>
                  <label htmlFor="eventMode">Event Mode</label>
                </div>
                <div className={createEventStyles.eventModeInputDiv}>
                  <Select
                    placeholder="Select Event Mode"
                    options={eventModeOptions}
                    onChange={handleEventModeChange}
                    fluid
                  />
                </div>
              </div>
              <div>
                <div className={createEventStyles.eventDescriptionLabelDiv}>
                  <label htmlFor="eventDescription">Description:</label>
                </div>
                <div className={createEventStyles.eventDescriptionInputDiv}>
                  <div ref={quillRef} />
                </div>
              </div>
              <div>
                {error && error.length > 0 && (
                  <h3 align="center" style={{ color: "red", padding: "10px" }}>
                    {error}
                  </h3>
                )}
              </div>
              <div className={createEventStyles.submitEventbtn}>
                <Button
                  type="button"
                  fluid
                  color="teal"
                  onClick={handleCreateEvent}
                >
                  Save Event
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="rightSideBar"></div>
      </div>
    </div>
  );
}
