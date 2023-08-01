"use client";
import React, { useState, useEffect, useRef } from "react";
import { API, Amplify } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import moment from "moment";
import {
  Input,
  Button,
  Icon,
  Dropdown,
  Select,
  TextArea,
} from "semantic-ui-react";
var axios = require("axios");
import Image from "next/image";
import DatePicker from "react-datepicker";
import { supabase } from "@/lib/supabase";

import "react-datepicker/dist/react-datepicker.css";

import createFestStyles from "@/app/styles/CreateFest.module.css";

import { createFest } from "@/src/graphql/mutations";

import defaultImage from "@/public/defaultImageBanner.jpg";
import defaultImageSmall from "@/public/defaultImageSmall.png";
import awsExports from "@/src/aws-exports";
export default function CreateFestPage() {
  Amplify.configure(awsExports);
  const router = useRouter();
  const [festObject, setFestObject] = useState({
    festName: "",
    collegeName: "",
    country: "",
    state: "",
    city: "",
    festStartDate: new Date(),
    festEndDate: new Date(),
    eventMode: "",
    isPublished: 1,
    festDescription: "",
    imageUrlSmall: "",
    imageUrlBanner: "",
  });

  const fileBannerImage = useRef(null);
  const fileSmallImage = useRef(null);
  const [imageBanner, setImageBanner] = useState(null);
  const [imageSmall, setImageSmall] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetCountryData = async () => {
    var config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_GET_LOCATION_DATA,
      },
    };

    axios(config)
      .then(function (response) {
        let count = Object.keys(response.data).length;
        let countryArray = [];
        for (let i = 0; i < count; i++) {
          countryArray.push({
            value: response.data[i].iso2,
            key: response.data[i].iso2,
            text: response.data[i].name,
          });
        }

        setCountryData(countryArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCountryChange = (event, data) => {
    setSelectedCountryCode(data.value);
    setFestObject({ ...festObject, country: event.target.innerText });
    handleGetStateDataByCountryCode(data.value);
  };

  const handleGetStateDataByCountryCode = async (countryCode) => {
    var config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {
        "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_GET_LOCATION_DATA,
      },
    };

    axios(config)
      .then(function (response) {
        let count = Object.keys(response.data).length;
        let stateArray = [];
        for (let i = 0; i < count; i++) {
          stateArray.push({
            key: response.data[i].iso2,
            value: response.data[i].iso2,
            text: response.data[i].name,
          });
        }

        setStatesData(stateArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleStateChange = (event, data) => {
    setFestObject({ ...festObject, state: event.target.innerText });
    handleGetCityDataByCountryAndStateCode(selectedCountryCode, data.value);
  };

  const handleCityChange = (event, data) => {
    setFestObject({ ...festObject, city: event.target.innerText });
  };

  const handleGetCityDataByCountryAndStateCode = async (
    countryCode,
    stateCode
  ) => {
    var config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_GET_LOCATION_DATA,
      },
    };

    axios(config)
      .then(function (response) {
        let count = Object.keys(response.data).length;
        let cityArray = [];
        for (let i = 0; i < count; i++) {
          cityArray.push({
            key: response.data[i].id,
            value: response.data[i].id,
            text: response.data[i].name,
          });
        }

        setCitiesData(cityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetCountryData();
  }, []);

  const eventModeOptions = [
    { key: "Offline", value: "Offline", text: "Offline" },
    { key: "Online", value: "Online", text: "Online" },
    { key: "Both", value: "Both", text: "Both" },
  ];

  const handleEventModeChange = (event, data) => {
    setFestObject({ ...festObject, eventMode: data.value });
  };

  const handleCreateFest = async () => {
    setLoading(true);
    let filepathBannerImage = "";

    let filepathSmallImage = "";
    try {
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

      if (imageSmall) {
        let filenameSmallImage = formatFilename(imageSmall.name);
        let imageSmallMimetype = imageSmall.type;

        let { data, error } = await supabase.storage
          .from("festbestbucket")
          .upload("public/" + filenameSmallImage, imageSmall, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageSmallMimetype,
          });

        filepathSmallImage = data.path;
      }

      // save filepath in database

      const festData = await API.graphql({
        query: createFest,
        variables: {
          input: {
            id: uuid(),
            festName: festObject.festName,
            collegeName: festObject.collegeName,
            state: festObject.state,
            city: festObject.city,
            country: festObject.country,
            festStartDate: festObject.festStartDate,
            festEndDate: festObject.festEndDate,
            eventMode: festObject.eventMode,
            isPublished: 1,
            festDescription: festObject.festDescription,
            imageUrlSmall: filepathSmallImage,
            imageUrlBanner: filepathBannerImage,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      const festCreated = festData.data.createFest.items;
      router.push("/me/fests");
      setLoading(false);
    } catch (error) {
      console.log("error on adding fest", error);
      setError("Error on adding fest");
    } finally {
      setLoading(false);
    }
  };

  const formatFilename = (filename) => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
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
    <div style={{ backgroundColor: "#fff" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="leftSideBar"></div>
        <div className="centerScreen">
          <div>
            {/* ---------Banner Image Start------------ */}
            <div className={createFestStyles.bannerImageContainer}>
              {imageBanner ? (
                <img
                  className={createFestStyles.bannerImageObjectURL}
                  src={imageBanner ? URL.createObjectURL(imageBanner) : null}
                />
              ) : (
                <div className={createFestStyles.defaultBannerImageContainer}>
                  <Image
                    src={defaultImage}
                    alt="default banner image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className={createFestStyles.bannerImageCancelImage}>
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

              <div className={createFestStyles.bannerImageClickBtn}>
                <Button
                  type="button"
                  color="teal"
                  icon
                  labelPosition="left"
                  onClick={() => {
                    fileBannerImage.current.click();
                  }}
                >
                  <Icon name="file" />
                  Upload a file
                </Button>
                <input
                  ref={fileBannerImage}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setImageBanner(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
            {/* ------------Banner Image End------- */}
          </div>
          <div className={createFestStyles.smallImageContainer}>
            <div className={createFestStyles.smallImageWrapper}>
              {/* Small Image Start */}
              <div className={createFest.createFestMainBox}>
                <div className={createFestStyles.smallImageBox}>
                  {imageSmall ? (
                    <img
                      className={createFestStyles.smallImageObjectURL}
                      src={imageSmall ? URL.createObjectURL(imageSmall) : null}
                    />
                  ) : (
                    <div className={createFestStyles.smallDefaultImageBox}>
                      <Image
                        src={defaultImageSmall}
                        alt="default banner image"
                        objectFit="cover"
                        layout="fill"
                      />
                    </div>
                  )}
                  <div className={createFestStyles.smallImageCloseBtn}>
                    <Button
                      type="button"
                      color="teal"
                      circular
                      icon="close"
                      onClick={() => {
                        setImageSmall(null);
                        if (fileSmallImage.current) {
                          fileSmallImage.current.value = "";
                          fileSmallImage.current.type = "text";
                          fileSmallImage.current.type = "file";
                        }
                      }}
                    />
                  </div>
                  <div className={createFestStyles.smallImageClickBtn}>
                    <Button
                      type="button"
                      color="teal"
                      icon="camera"
                      circular
                      onClick={() => fileSmallImage.current.click()}
                    ></Button>
                    <input
                      ref={fileSmallImage}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => setImageSmall(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              {/* Small Image End */}
            </div>
            <div className={createFestStyles.festDetailsContainer}>
              {/* Fest Name start */}
              <div className={createFestStyles.detailsFieldContainer}>
                <label
                  htmlFor="festName"
                  className={createFestStyles.detailsFieldContainerlabel}
                >
                  Fest Name:
                </label>
                <Input
                  fluid
                  placeholder="Enter Fest Name"
                  id="festName"
                  name="festName"
                  className={createFestStyles.detailsFieldContainerInput}
                  onChange={(e) =>
                    setFestObject({ ...festObject, festName: e.target.value })
                  }
                />
              </div>
              {/* Fest Name end */}

              {/* College Name start */}
              <div className={createFestStyles.detailsFieldContainer}>
                <label
                  htmlFor="collegeName"
                  className={createFestStyles.detailsFieldContainerlabel}
                >
                  College Name:
                </label>
                <Input
                  fluid
                  placeholder="Enter College Name"
                  id="collegeName"
                  name="collegeName"
                  className={createFestStyles.detailsFieldContainerInput}
                  onChange={(e) =>
                    setFestObject({
                      ...festObject,
                      collegeName: e.target.value,
                    })
                  }
                />
              </div>
              {/* College Name end */}

              {/* Country dropdown start */}
              <div className={createFestStyles.detailsFieldContainer}>
                <label
                  htmlFor="countryName"
                  className={createFestStyles.detailsFieldContainerlabel}
                >
                  Country Name
                </label>
                <div>
                  {countryData && countryData.length > 0 ? (
                    <Dropdown
                      options={countryData}
                      placeholder="Select Country"
                      search
                      selection
                      className={createFestStyles.detailsFieldContainerInput}
                      fluid
                      id="country"
                      name="country"
                      onChange={handleCountryChange}
                    />
                  ) : (
                    <Dropdown
                      options={[]}
                      placeholder="Select Country"
                      search
                      selection
                      className={createFestStyles.detailsFieldContainerInput}
                      fluid
                      id="country"
                      name="country"
                      onChange={handleCountryChange}
                    />
                  )}
                </div>
              </div>
              {/* Country dropdown end */}

              {/* state dropdown start */}
              <div className={createFestStyles.detailsFieldContainer}>
                <label
                  htmlFor="countryName"
                  className={createFestStyles.detailsFieldContainerlabel}
                >
                  State Name
                </label>
                <div>
                  <Dropdown
                    placeholder="Select State"
                    search
                    options={statesData}
                    selection
                    className={createFestStyles.detailsFieldContainerlabel}
                    fluid
                    id="state"
                    name="state"
                    onChange={handleStateChange}
                  />
                </div>
              </div>
              {/* state dropdown end */}

              {/* city dropdown start */}
              <div className={createFestStyles.detailsFieldContainer}>
                <label
                  htmlFor="countryName"
                  className={createFestStyles.detailsFieldContainerlabel}
                >
                  City Name
                </label>
                <div>
                  <Dropdown
                    placeholder="Select State"
                    search
                    selection
                    options={citiesData}
                    className={createFestStyles.detailsFieldContainerInput}
                    fluid
                    id="city"
                    name="city"
                    onChange={handleCityChange}
                  />
                </div>
              </div>
              {/* city dropdown end */}

              <div className={createFestStyles.detailsFieldContainerDateDiv}>
                {/* festStart Date start*/}
                <div className={createFestStyles.detailsDateFieldWrapper}>
                  <div
                    className={createFestStyles.detailsDateFieldContainerDiv}
                  >
                    <label
                      htmlFor="festStartDate"
                      className={
                        createFestStyles.detailsDateFieldContainerLabel
                      }
                    >
                      Fest Start Date:
                    </label>
                  </div>
                  <div>
                    <DatePicker
                      selected={festObject.festStartDate}
                      className={
                        createFestStyles.detailsFieldContainerDateField
                      }
                      onChange={(date) => {
                        setFestObject({ ...festObject, festStartDate: date });
                      }}
                    />
                  </div>
                </div>
                {/* fest Start Date end */}
                {/* fest End Date start */}
                <div className={createFestStyles.detailsDateFieldWrapper}>
                  <div
                    className={createFestStyles.detailsDateFieldContainerDiv}
                  >
                    <label
                      htmlFor="festStartDate"
                      className={
                        createFestStyles.detailsDateFieldContainerLabel
                      }
                    >
                      Fest End Date:
                    </label>
                  </div>
                  <div>
                    <DatePicker
                      selected={festObject.festStartDate}
                      onChange={(date) => {
                        setFestObject({ ...festObject, festEndDate: date });
                      }}
                      className={
                        createFestStyles.detailsFieldContainerDateField
                      }
                    />
                  </div>
                </div>
                {/* fest End Date end */}
              </div>
              <div className={createFestStyles.detailsFieldContainer}>
                <label className={createFestStyles.detailsFieldContainerlabel}>
                  Event Mode:
                </label>
                <Select
                  placeholder="Select Event Mode"
                  options={eventModeOptions}
                  className={createFestStyles.detailsFieldContainerInput}
                  onChange={handleEventModeChange}
                  fluid
                />
              </div>
              {/* fest Description start */}
              <div className={createFestStyles.detailsFieldContainer}>
                <label
                  className={createFestStyles.detailsFieldContainerlabel}
                  htmlFor="festDescription"
                >
                  Description:
                </label>
                <TextArea
                  className={createFestStyles.detailsFieldContainerTextArea}
                  fluid
                  placeholder="Enter Description"
                  id="festDescription"
                  name="festDescription"
                  onChange={(e) =>
                    setFestObject({
                      ...festObject,
                      festDescription: e.target.value,
                    })
                  }
                />
              </div>
              {/* fest Description end */}
              <div>
                {error && error.length > 0 && (
                  <h3 align="center" style={{ color: "red", padding: "10px" }}>
                    {error}
                  </h3>
                )}
              </div>
              <div>
                <Button
                  type="submit"
                  fluid
                  color="teal"
                  onClick={handleCreateFest}
                >
                  Save Fest
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
