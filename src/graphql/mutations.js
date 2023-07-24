/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFest = /* GraphQL */ `
  mutation CreateFest(
    $input: CreateFestInput!
    $condition: ModelFestConditionInput
  ) {
    createFest(input: $input, condition: $condition) {
      id
      festName
      collegeName
      state
      city
      country
      festStartDate
      festEndDate
      eventMode
      isPublished
      festDescription
      imageUrlSmall
      imageUrlBanner
      events {
        items {
          id
          eventName
          eventStartDate
          eventEndDate
          descriptionForinnerHTML
          descriptionForEditting
          eventMode
          isPublished
          imageUrlBanner
          createdAt
          updatedAt
          festEventsId
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateFest = /* GraphQL */ `
  mutation UpdateFest(
    $input: UpdateFestInput!
    $condition: ModelFestConditionInput
  ) {
    updateFest(input: $input, condition: $condition) {
      id
      festName
      collegeName
      state
      city
      country
      festStartDate
      festEndDate
      eventMode
      isPublished
      festDescription
      imageUrlSmall
      imageUrlBanner
      events {
        items {
          id
          eventName
          eventStartDate
          eventEndDate
          descriptionForinnerHTML
          descriptionForEditting
          eventMode
          isPublished
          imageUrlBanner
          createdAt
          updatedAt
          festEventsId
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteFest = /* GraphQL */ `
  mutation DeleteFest(
    $input: DeleteFestInput!
    $condition: ModelFestConditionInput
  ) {
    deleteFest(input: $input, condition: $condition) {
      id
      festName
      collegeName
      state
      city
      country
      festStartDate
      festEndDate
      eventMode
      isPublished
      festDescription
      imageUrlSmall
      imageUrlBanner
      events {
        items {
          id
          eventName
          eventStartDate
          eventEndDate
          descriptionForinnerHTML
          descriptionForEditting
          eventMode
          isPublished
          imageUrlBanner
          createdAt
          updatedAt
          festEventsId
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      eventName
      eventStartDate
      eventEndDate
      descriptionForinnerHTML
      descriptionForEditting
      eventMode
      isPublished
      imageUrlBanner
      fest {
        id
        festName
        collegeName
        state
        city
        country
        festStartDate
        festEndDate
        eventMode
        isPublished
        festDescription
        imageUrlSmall
        imageUrlBanner
        events {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      festEventsId
      owner
      __typename
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      eventName
      eventStartDate
      eventEndDate
      descriptionForinnerHTML
      descriptionForEditting
      eventMode
      isPublished
      imageUrlBanner
      fest {
        id
        festName
        collegeName
        state
        city
        country
        festStartDate
        festEndDate
        eventMode
        isPublished
        festDescription
        imageUrlSmall
        imageUrlBanner
        events {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      festEventsId
      owner
      __typename
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      eventName
      eventStartDate
      eventEndDate
      descriptionForinnerHTML
      descriptionForEditting
      eventMode
      isPublished
      imageUrlBanner
      fest {
        id
        festName
        collegeName
        state
        city
        country
        festStartDate
        festEndDate
        eventMode
        isPublished
        festDescription
        imageUrlSmall
        imageUrlBanner
        events {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      festEventsId
      owner
      __typename
    }
  }
`;
